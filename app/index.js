import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import firebase from './../configs/FirebaseConfig'

export default function Index() {
  return <Redirect href="/(Auth)/Login" />;
}
