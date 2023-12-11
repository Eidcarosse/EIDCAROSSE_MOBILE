import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import { get, getDatabase, onValue, push, ref, set } from "firebase/database";

import { getUserByID } from "../../backend/auth";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import { useSelector } from "react-redux";
import { selectUserMeta } from "../../redux/slices/user";

export default function ChatIcon({ navigation, data }) {
  const loginuser = useSelector(selectUserMeta);
  const [user, setUser] = useState();
  const database = getDatabase();

  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");

  const fetchData = useCallback(async () => {
    let search;
    loginuser._id == data.split("_")[0]
      ? (search = data.split("_")[1])
      : (search = data.split("_")[0]);
    let user = await getUserByID(search);
    setUser(user);
  }, [loginuser, data]);

  const myfuntion = async () => {
    const messagesRef = ref(database, `chatrooms/${data}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();

      if (messageData) {
        // Convert the message data to an array and sort it in descending order
        const messageList = Object.values(messageData);

        messageList.map((message) => {
          setDate(message?.timestamp);
          setMsg(message?.text);
        });
        // .reverse(); // Reverse the order to display the newest messages at the bottom
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    myfuntion();
  }, []);
  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        navigation.navigate(ScreenNames.CHAT, {
          usr: user,
          userRoom: data,
          userItem: data.split("_")[2],
        });
      }}
    >
      <View style={styles.main}>
        <View style={styles.imageview}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: user?.image }}
          />
        </View>
        <View style={styles.detail}>
          <Text
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: width(3.5) }}
          >
            {user?.firstName} {user?.lastName}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            {msg}
          </Text>
          <Text />
        </View>

        <View style={styles.icons}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "bold",
              fontSize: width(2.5),
              width: width(15),
            }}
          >
            {`${new Date(date).getDate()}/${
              new Date(date).getMonth() + 1
            }/${new Date(date).getFullYear()}`}
          </Text>
          <Text />
        </View>
      </View>
    </TouchableOpacity>
  );
}
