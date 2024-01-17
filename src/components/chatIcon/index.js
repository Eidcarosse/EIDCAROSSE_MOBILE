import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dialog from "react-native-dialog";
import ScreenNames from "../../routes/routes";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import { remove } from "firebase/database";
import { get, getDatabase, ref, set } from "firebase/database";
import { setChatRooms } from "../../redux/slices/user";
import { useDispatch } from "react-redux";
import AppColors from "../../utills/AppColors";

export default function ChatIcon({ data }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [newMsg, setNewMsg] = useState(false);
  useEffect(() => {
    setSelectedItem(!data?.product || !data?.user);
    setNewMsg(data?.read);
  }, [data]);
  const database = getDatabase();
  const deleteChatroom = async (chatroomId) => {
    // Assuming `chatroomId` is the unique identifier for the chatroom

    try {
      // Remove messages
      await remove(ref(database, `chatrooms/${chatroomId}/messages`));

      // Remove lastRead information
      await remove(ref(database, `chatrooms/${chatroomId}/lastRead`));

      // Remove the chatroom itself
      await remove(ref(database, `chatrooms/${chatroomId}`));
      await setRooms(chatroomId, data?.user?._id);
      // You may also want to update your state to reflect the removal
      // Example: setRooms(null, route.params.usr?._id);
      //          setRooms(null, user?._id);
    } catch (error) {
      console.error("Error deleting chatroom:", error.message);
      // Handle errors as needed
    }
  };
  const setRooms = async (roomId, id) => {
    const dataRef = ref(database, `users/${id}`);
    lst = [`${roomId}`];
    await get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const roomsFromData = data.rooms;
          const newRooms = roomsFromData.filter((room) => !lst.includes(room));
          lst = lst.concat(newRooms);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });

    const userRef = ref(database, `users/${id}`);

    const updateData = {
      online: false,
      rooms: lst, // Update the 'rooms' field with the 'lst' object
    };

    set(userRef, updateData)
      .then(() => {
        dispatch(setChatRooms(roomID));

        console.log("Update successful");
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
  };
  // Example usage in your component
  const onDeleteChatroom = useCallback((id) => {
    // Assuming you have access to the chatroom ID you want to delete
    const chatroomIdToDelete = id;

    deleteChatroom(chatroomIdToDelete);
  }, []);
  const handlePress = useCallback(() => {
    navigation.navigate(ScreenNames.CHAT, {
      usr: data?.user,
      userRoom: data?.roomId,
      userItem: data?.product,
    });
  });
  return (
    <Fragment>
      <TouchableOpacity
        style={styles.main}
        // onLongPress={() => setVisible(true)}
        onPress={handlePress}
      >
        <View
          style={[
            styles.imageview,
            selectedItem && { borderColor: "lightgrey" },
          ]}
        >
          <Image
            resizeMode="contain"
            style={[styles.image]}
            source={{
              uri:
                data?.user?.image ||
                "https://res.cloudinary.com/dlkuyfwzu/image/upload/v1704430891/Simple_avatar_qrmt3r.png",
            }}
            onLoad={() => setImageLoading(false)}
          />
          {imageLoading && (
            <View
              style={{
                width: height(8),
                height: height(8),
                borderRadius: height(10),
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color={AppColors.primary} />
            </View>
          )}
          {selectedItem && (
            <View
              style={{
                width: height(8),
                height: height(8),
                borderRadius: height(10),
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
                fontSize: height(1.8),
                paddingTop: height(1),
              },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {data?.user
              ? `${data?.user?.firstName} ${data?.user?.lastName}`
              : "Eidcarosse user"}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              { paddingTop: height(1), fontSize: height(1) },
              newMsg && { fontWeight: "bold", fontSize: height(1.3) },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {data?.lastmsg?.message}
            {data?.lastmsg?.image && (
              <Ionicons name="image" size={height(2)} color={"grey"} />
            )}
          </Text>
          <Text />
        </View>
        <View style={styles.icons}>
          <Text
            numberOfLines={1}
            style={[
              {
                fontWeight: "bold",
                fontSize: height(1.2),
              },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {data?.lastmsg?.date
              ? `${new Date(data?.lastmsg?.date).getDate()}/${
                  new Date(data?.lastmsg?.date).getMonth() + 1
                }/${new Date(data?.lastmsg?.date).getFullYear()}`
              : "00/00/0000"}
          </Text>
          <Text />
        </View>
      </TouchableOpacity>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title> {t("Delete Chat")}</Dialog.Title>
          <Dialog.Description>
            <Text style={{ fontSize: height(1.5) }}>
              {t("Do you want to delete the chat")}
            </Text>
          </Dialog.Description>
          <Dialog.Button
            label={t("myad.cancel")}
            onPress={() => {
              setVisible(false);
            }}
          />
          <Dialog.Button
            color={"red"}
            label={t("myad.delete")}
            onPress={() => {
              deleteChatroom(data?.roomId);
              setVisible(false);
            }}
          />
        </Dialog.Container>
      </View>
    </Fragment>
  );
}
