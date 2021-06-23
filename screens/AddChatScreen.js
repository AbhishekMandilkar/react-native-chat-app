import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { db } from "../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  const creatChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => alert(err));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerStyle: { backgroundColor: "#FFFF" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.InputField}
        value={input}
        onChangeText={(text) => {
          setInput(text);
        }}
        placeholder="Enter a chat name"
        omSubmitEditing={creatChat}
      />
      <Button onPress={creatChat} title="Create a chat" />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    padding: 30,
  },
});
