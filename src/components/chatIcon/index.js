import React, { Fragment, useEffect, useState, useMemo, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { get, getDatabase, onValue, ref } from "firebase/database";
import Dialog from "react-native-dialog";
import { getUserByID } from "../../backend/auth";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import { useSelector } from "react-redux";
import { selectUserMeta } from "../../redux/slices/user";
import { getDataofAdByID } from "../../backend/api";
import { useTranslation } from "react-i18next";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";

export default function ChatIcon({ data }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const loginuser = useSelector(selectUserMeta);

  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const database = useMemo(() => getDatabase(), []);

  const fetchData = useCallback(async () => {
    const search = loginuser._id === data.split("_")[0] ? data.split("_")[1] : data.split("_")[0];
    const fetchedUser = await getUserByID(search);
    setUser(fetchedUser);
  }, [loginuser._id, data]);

  const myFunction = useCallback(async () => {
    const messagesRef = ref(database, `chatrooms/${data}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();

      if (messageData) {
        const messageList = Object.values(messageData);
        messageList.forEach((message) => {
          setDate(message?.timestamp);
          setMsg(message?.text);
        });
      }
    });
  }, [database, data]);

  const getItems = useCallback(async () => {
    const response = await getDataofAdByID(data.split("_")[2]);
    setSelectedItem(!response);
  }, [data]);

  const handlePress = useCallback(() => {
    navigation.navigate(ScreenNames.CHAT, {
      usr: user,
      userRoom: data,
      userItem: data.split("_")[2],
    });
  }, [navigation, user, data]);

  useEffect(() => {
    const fetchDataAndItems = async () => {
      await fetchData();
      await getItems();
      myFunction();
    };

    fetchDataAndItems();
  }, [fetchData, getItems, myFunction]);

  return (
    <Fragment>
      <TouchableOpacity style={styles.main} onPress={handlePress}>
        <View style={[styles.imageview, selectedItem && { borderColor: "lightgrey" }]}>
          <Image resizeMode="contain" style={[styles.image]} source={{ uri: user?.image }} />
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
              { fontWeight: "bold", fontSize: width(3.5), paddingTop: height(1) },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {`${user?.firstName} ${user?.lastName}`}
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
            {`${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`}
          </Text>
          <Text />
        </View>
      </TouchableOpacity>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title> {t("Delete Chat")}</Dialog.Title>
          <Dialog.Description>
            <Text style={{ fontSize: width(3) }}>{t("Do you want to delete the chat")}</Text>
          </Dialog.Description>
          <Dialog.Button label={t("myad.cancel")} onPress={() => setVisible(false)} />
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
