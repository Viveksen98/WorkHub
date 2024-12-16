import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/FirebaseConfig";

const Colors = {
  WHITE: "#FFFFFF",
  GRAY: "#A9A9A9",
  PRIMARY: "#007BFF",
};

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = () => {
    if (!email || !password || !fullname) {
      ToastAndroid.show("Please enter all details", ToastAndroid.LONG);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);
        router.replace("/Login"); // Adjust path based on folder structure
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        if (error.code === "auth/email-already-in-use") {
          ToastAndroid.show("Email already in use", ToastAndroid.LONG);
        } else if (error.code === "auth/invalid-email") {
          ToastAndroid.show("Invalid email address", ToastAndroid.LONG);
        } else if (error.code === "auth/weak-password") {
          ToastAndroid.show(
            "Password should be at least 6 characters",
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show("Account creation failed", ToastAndroid.LONG);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Create New Account</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={(value) => setFullName(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={OnCreateAccount}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.replace("/sign-in")}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: "outfit",
    marginBottom: 5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  createAccountButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
  },
  createAccountText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  signInText: {
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
