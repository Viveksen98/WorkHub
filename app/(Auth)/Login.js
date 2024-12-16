import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/FirebaseConfig";

const Colors = {
  WHITE: "#FFFFFF",
  GRAY: "#A9A9A9",
  PRIMARY: "#007BFF",
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please Enter Email & Password", ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("(src)/Home");
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        if (error.code === "auth/invalid-email") {
          ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
        } else {
          ToastAndroid.show("Authentication failed", ToastAndroid.LONG);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.subtitle}>You've been missed!</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          placeholder="Enter Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter Password"
        />
      </View>
      <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("(Auth)/SignupPage")}
        style={styles.createAccountButton}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 30,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: 30,
    color: Colors.GRAY,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
  },
  signInText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
  createAccountButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
