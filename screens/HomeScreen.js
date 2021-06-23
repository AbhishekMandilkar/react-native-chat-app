import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";

const HomeScreen = ({ navigation, route }) => {
  //user signout
  const signUserOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("user signed out");
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //fetch chats

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChatList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);
  //store chats
  const [chatList, setChatList] = useState([]);
  console.log(chatList);
  //set header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Chats",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20, alignContent: "center" }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signUserOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity style={{ padding: 10 }} activeOpacity={0.5}>
            <Entypo name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddChat");
            }}
            style={{ padding: 10 }}
            activeOpacity={0.5}
          >
            <Entypo name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={{ height: "100%" }}>
        {chatList.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
