import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, onBackPress, style }) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />

      <View style={[styles.container, style]}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('(src)/Profile')}
          style={styles.profileButton}
        >
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Background color for visibility
    padding: 5,
    borderRadius: 50,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginLeft: 50, // Adjust to ensure the title is centered properly
  },
  profileButton: {
    padding: 5,
    borderRadius: 50,
  },
});
