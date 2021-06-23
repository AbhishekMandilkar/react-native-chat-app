import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => console.error(err));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg",
        }}
        style={{ width: 300, height: 300 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          //   underlineColorAndroid="transparent"
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.inputField}
          disabledInputStyle
          placeholder="Password"
          //   underlineColorAndroid="transparent"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => {
          navigation.navigate("Register");
        }}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 10 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: { width: 300 },
  button: { width: 200, marginTop: 30 },
  inputField: {
    marginTop: 20,
    height: 40,
    paddingLeft: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
    // underlineColorAndroid: "white",
    borderBottomWidth: 0,
  },
});
