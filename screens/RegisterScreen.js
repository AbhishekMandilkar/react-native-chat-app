import React, { useState, useLayoutEffect } from "react";
import {} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imgUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => console.log(error.message));
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.conatiner}>
      <Text style={{ marginBottom: 50, fontSize: 40 }}>Create Account</Text>
      <View style={styles.inputContainer}>
        <Input
          autoFocus
          placeholder="Full Name"
          type="text"
          value={name}
          onChangeText={(text) => {
            setname(text);
          }}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => {
            setemail(text);
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Input
          placeholder="Profile Picture url (optional)"
          type="text"
          value={imgUrl}
          onChangeText={(text) => {
            setImgUrl(text);
          }}
          onSubmitEditing={register}
        />
      </View>
      <Button
        conatinerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
