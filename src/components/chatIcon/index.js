import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import { getUserByID } from "../../backend/auth";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import { useSelector } from "react-redux";
import { selectUserMeta } from "../../redux/slices/user";

export default function ChatIcon({ data, onPress }) {
  const navigation = useNavigation();
  const loginuser = useSelector(selectUserMeta);
  const [user, setUser] = useState();
  useEffect(async () => {
    let search;
    loginuser._id == data.split("_")[0]
      ? (search = data.split("_")[1])
      : (search = data.split("_")[0]);
    let user = await getUserByID(search);
    setUser(user);
  }, []);
  // console.log("indata", data);
  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        console.log('====================================');
        console.log("All Chatroom id ",data);
        console.log('====================================');
        navigation.navigate(ScreenNames.CHAT, {
          usr: user,
          userRoom:data,
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
            {user?.firstName}{" "}{user?.lastName}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            
          </Text>
          <Text />
        </View>

        <View style={styles.icons}>
          <Text
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: width(2.5) }}
          >
            {data?.date}
          </Text>
          <Text />
        </View>
      </View>
    </TouchableOpacity>
  );
}
