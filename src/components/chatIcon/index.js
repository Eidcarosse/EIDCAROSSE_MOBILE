import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import { get, getDatabase, onValue, push, ref, set } from "firebase/database";
import Dialog from "react-native-dialog";
import { getUserByID } from "../../backend/auth";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import { useSelector } from "react-redux";
import { selectUserMeta } from "../../redux/slices/user";
import { getDataofAdByID } from "../../backend/api";
import { useTranslation } from "react-i18next";

export default function ChatIcon({ navigation, data }) {
  const { t } = useTranslation();
  const loginuser = useSelector(selectUserMeta);
  const [user, setUser] = useState();
  const database = getDatabase();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  // useEffect(() => {
  //   fetchData();
  // }, [loginuser, data]);

  const fetchData = async () => {
    let search;
    loginuser._id == data.split("_")[0]
      ? (search = data.split("_")[1])
      : (search = data.split("_")[0]);
    let user = await getUserByID(search);
    setUser(user);
  };

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
  const getItems = async () => {
    const response = await getDataofAdByID(data.split("_")[2]);
    setSelectedItem(!response);
  };
  useEffect(() => {
    getItems();
  }, [msg, data]);
  useEffect(() => {
    if (!selectedItem) {
      fetchData();
      myfuntion();
    }
  }, [selectedItem]);

  return (
    <Fragment>
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
        <View style={styles.imageview}>
          <Image
            resizeMode="contain"
            style={[styles.image, selectedItem && { borderColor: "lightgrey" }]}
            source={{ uri: user?.image }}
          />
          {selectedItem && (
            <View
              style={{
                width: width(17),
                height: width(17),
                borderRadius: width(10),
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "absolute",
              }}
            />
          )}
        </View>
        <View style={styles.detail}>
          <Text
            numberOfLines={1}
            style={[
              {
                fontWeight: "bold",
                fontSize: width(3.5),
                paddingTop: height(1),
              },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {user?.firstName} {user?.lastName}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              { paddingTop: height(1), fontSize: width(2.5) },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {msg}
          </Text>
          <Text />
        </View>

        <View style={styles.icons}>
          <Text
            numberOfLines={1}
            style={[
              {
                fontWeight: "bold",
                fontSize: width(2.5),
                width: width(15),
              },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {`${new Date(date).getDate()}/${
              new Date(date).getMonth() + 1
            }/${new Date(date).getFullYear()}`}
          </Text>
          <Text />
        </View>
      </TouchableOpacity>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title> {t("Delete Chat")}</Dialog.Title>
          <Dialog.Description>
            <Text style={{ fontSize: width(3) }}>
              {t("Do you want to delete the caht")}
            </Text>
          </Dialog.Description>
          <Dialog.Button
            label={t("myad.cancel")}
            onPress={() => setVisible(false)}
          />
          <Dialog.Button
            color={"red"}
            label={t("myad.delete")}
            onPress={() => {
              setVisible(false);
            }}
          />
        </Dialog.Container>
      </View>
    </Fragment>
  );
}
