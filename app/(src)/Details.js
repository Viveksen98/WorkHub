import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Header from "../../components/Header";

const ProfileScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Header title="" />

      {/* Profile Info */}
      <View style={styles.profileInfo}>
      <Image 
    style={styles.profilePic} 
    source={{ uri: item.avatarUrl || "https://via.placeholder.com/80" }} // Fallback URL
  />
        <View style={styles.profileStats}>
        <Text style={styles.statNumber}>{item.review_image.length}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.profileStats}>
        <Text style={styles.statNumber}>{item.workdone}</Text>
        <Text style={styles.statLabel}>Work</Text>
        </View>
        <View style={styles.profileStats}>
          <Text style={styles.statNumber}>{item.experience}</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
      </View>

      {/* Profile Name and Bio */}
      <View style={styles.bioSection}>

        <Text style={styles.username}>{item.UserName}</Text>


        <Text style={styles.name}>{item.description}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Highlights */}
      <ScrollView horizontal style={styles.highlights}>
        {item.highlightimage?.map((highlight, index) => (
          <View key={index} style={styles.highlight}>
            <Image
              style={styles.highlightImage}
              source={{ uri: highlight || "https://via.placeholder.com/60" }} // Fallback URL
            />
            <Text style={styles.highlightText}>Highlight {index + 1}</Text>
          </View>
        ))}
        <View style={styles.highlight}>
          <Entypo name="circle-with-plus" size={40} color="#1e90ff" />
          <Text style={styles.highlightText}>New</Text>
        </View>
      </ScrollView>

      {/* Posts Section */}
      <ScrollView contentContainerStyle={{ marginBottom: -50 }}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <View style={styles.postGrid}>
          {item.review_image?.map((review, index) => (
            <Image
              key={index}
              style={styles.postImage}
              source={{ uri: review || "https://via.placeholder.com/120" }} // Fallback URL
            />
          ))}
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() =>
          navigation.navigate("(src)/ScheduleAndAddress", { item })
        }
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  username: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#1e90ff",
  },
  profileStats: {
    alignItems: "center",
  },
  statNumber: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#666",
    fontSize: 14,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  highlights: {
    marginHorizontal: 10,
  },
  highlight: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 55,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1e90ff",
  },
  highlightText: {
    color: "black",
    fontSize: 12,
    marginTop: 5,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
  postGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  postImage: {
    width: "30%",
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  proceedButton: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;