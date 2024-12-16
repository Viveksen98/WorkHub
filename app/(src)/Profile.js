import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { auth, storage, db } from './../../configs/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { FAB } from 'react-native-paper';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { router } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [firestoreRequests, setFirestoreRequests] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchProfilePic(currentUser.uid);
    }
    fetchFirestoreRequests(); // Load requests from Firestore
  }, []);

  const fetchFirestoreRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'workerRequests')); // Replace with your collection name
      const fetchedRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFirestoreRequests(fetchedRequests);
    } catch (error) {
      console.error('Error fetching Firestore requests:', error);
    }
  };

  const fetchProfilePic = async (uid) => {
    try {
      const profilePicRef = ref(storage, `profile_pics/${uid}`);
      const url = await getDownloadURL(profilePicRef);
      setProfilePic(url);
    } catch (error) {
      console.log('Error fetching profile picture:', error);
    }
  };

  const uploadProfilePic = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to the media library.');
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const uid = user.uid;
        const profilePicRef = ref(storage, `profile_pics/${uid}`);

        try {
          const snapshot = await uploadBytes(profilePicRef, blob);
          const downloadURL = await getDownloadURL(snapshot.ref);
          setProfilePic(downloadURL);
          setImageLoading(false);
          Alert.alert('Success', 'Profile picture uploaded successfully!');
        } catch (error) {
          setImageLoading(false);
          Alert.alert('Error', 'Failed to upload profile picture');
        }
      }
    } catch (error) {
      console.log('Error launching image picker:', error);
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        Alert.alert('Success', 'User signed out successfully!');
        navigation.navigate("(Auth)/Login");
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to sign out');
      });
  };

  const navigateToHome = () => {
    // Reset the navigation to Home
    router.replace("(src)/Home"); // Make sure this is the correct route
  };

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user.fullname || user.email}</Text>
      {imageLoading ? (
        <Text>Loading image...</Text>
      ) : (
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : require('./../../assets/images/profile-png-icon-4.jpg')
          }
          style={styles.profilePic}
        />
      )}
      <Button title="Upload Profile Picture" onPress={uploadProfilePic} />

      <Text style={styles.requestsHeading}>Scheduled Requests (Firebase):</Text>
      <ScrollView style={styles.requestsContainer}>
        {firestoreRequests.length === 0 ? (
          <Text style={styles.noRequestsText}>No scheduled requests yet.</Text>
        ) : (
          firestoreRequests.map((request) => (
            <View key={request.id} style={styles.requestItem}>
              <Text style={styles.requestText}>Date: {request.date}</Text>
              <Text style={styles.requestText}>Time: {request.time}</Text>
              <Text style={styles.requestText}>Worker: {request.worker}</Text>
              <Text style={styles.requestText}>Status: {request.status || 'Pending'}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* FAB for Logout */}
      <FAB
        style={styles.fabLogout}
        icon="logout"
        onPress={handleLogout}
        label="Logout"
      />

      {/* FAB for Home */}
      <FAB
        style={styles.fabHome}
        icon="home"
        onPress={navigateToHome}
        label="Home"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'gray',
    marginBottom: 20,
  },
  requestsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  requestsContainer: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 400,
  },
  noRequestsText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  requestText: {
    fontSize: 16,
    color: '#333',
  },
  fabLogout: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabHome: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
});

export default Profile;
