import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { db, auth } from "../firebase";
// import { TouchablWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import * as firebase from "firebase";

const ChatScreen = ({ route, navigation }) => {
  console.log();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20 }}>{route.params.chatName}</Text>
          <Avatar
            rounded
            source={{
              uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
        </View>
      ),
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "#000000",
    });
  }, [navigation]);

  const [input, setInput] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState([]);

  const sendMessage = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) =>
        setFetchedMessages(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  console.log(fetchedMessages);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView
            style={{ flex: 1, bottom: 0, flexDirection: "column-reverse" }}
          >
            {fetchedMessages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.msgSend}>
                  <Text style={styles.message}>{data.message}</Text>
                  <Avatar
                    rounded
                    source={{ uri: `${auth.currentUser.photoURL}` }}
                  />
                </View>
              ) : (
                <View key={id} style={styles.msgRcv}>
                  <Avatar rounded source={{ uri: `${data.photoURL}` }} />
                  <Text style={[styles.message, styles.messageRcv]}>
                    {data.message}
                  </Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              style={styles.inputField}
              onSubmitEditing={sendMessage}
              onChangeText={(text) => setInput(text)}
              placeholder="Enter chat"
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Ionicons name="ios-send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    color: "grey",
    padding: 10,
    borderRadius: 30,
  },
  msgSend: { flexDirection: "row", padding: 14, justifyContent: "flex-end" },
  msgRcv: { flexDirection: "row", padding: 14 },
  message: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  messageRcv: {
    backgroundColor: "#4c8bf5",
    color: "white",
  },
});
