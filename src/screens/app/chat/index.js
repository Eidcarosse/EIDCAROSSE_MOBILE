import { getDatabase, off, onValue, ref } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ChatIcon, ScreenWrapper } from "../../../components";
import Header from "../../../components/header";
import {
  selectChatRedux,
  selectChatRooms,
  selectUserMeta,
  setChatRedux,
  setChatRooms,
} from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";

import Icons from "../../../asset/images";
import { getDataofAdByID } from "../../../backend/api";
import { getUserByID } from "../../../backend/auth";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
export default function ChatList({ navigation, route }) {
  const dispatch = useDispatch();
  const db = getDatabase();
  const user = useSelector(selectUserMeta);
  const allRooms = useSelector(selectChatRooms);
  const Chat = useSelector(selectChatRedux);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      fetchRooms(user?._id);
    }, [])
  );
  function compareArrays(array1, array2) {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
      return false;
    }

    // Sort the arrays to ensure order doesn't affect the comparison
    const sortedArray1 = array1.slice().sort();
    const sortedArray2 = array2.slice().sort();

    // Compare each element in the sorted arrays
    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false; // Arrays are different
      }
    }

    return true; // Arrays are the same
  }
  const fetchRooms = async (userId) => {
    try {
      let roomRef = ref(db, `users/${userId}/rooms`);

      const handleRoomUpdate = (snapshot) => {
        const room = snapshot.val() || [];
        if (!compareArrays(room, allRooms)) dispatch(setChatRooms(room));
      };
      onValue(roomRef, handleRoomUpdate);
      return () => {
        if (roomRef) {
          off(roomRef, handleRoomUpdate);
        }
      };
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const fetchData = useCallback(async (data) => {
    const search =
      user._id === data.split("_")[0] ? data.split("_")[1] : data.split("_")[0];
    const fetchedUser = await getUserByID(search);
    return fetchedUser;
  });
  const myFunction = useCallback(async (data) => {
    let lastmsg = {};
    const messagesRef = ref(db, `chatrooms/${data}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();

      if (messageData) {
        const messageList = Object.values(messageData);
        messageList.forEach((message) => {
          lastmsg = {
            message: message?.text,
            date: message?.timestamp,
            image: message?.images,
          };
        });
      }
    });
    return lastmsg;
  });

  const getItems = useCallback(async (data) => {
    const response = await getDataofAdByID(data.split("_")[2]);
    return response;
  });
  const promisFuntion = async () => {
    try {
      setLoading(true);
      const promises = allRooms.map(async (element) => {
        let u = await fetchData(element);
        let l = await myFunction(element);
        let i = await getItems(element);
        return {
          roomId: element,
          user: u,
          lastmsg: l,
          product: i,
        };
      });

      const newData = await Promise.all(promises);
      dispatch(setChatRedux(newData));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (allRooms) promisFuntion();
  }, [allRooms]);
  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      refreshing={loading}
      scrollEnabled
    >
      {/* {loading && (
        <View>
          <ActivityIndicator color={AppColors.primary} size={"large"} />
        </View>
      )} */}

      <View style={styles.mainViewContainer}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={Chat}
          renderItem={({ item }) => (
            <ChatIcon data={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
            <View>
              <Image
                source={Icons.emptyChat}
                style={{
                  height: width(50),
                  width: width(50),
                  marginTop: height(20),
                }}
              />
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
