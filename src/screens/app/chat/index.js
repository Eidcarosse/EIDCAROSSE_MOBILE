import React, { useCallback, useEffect } from "react";
import { FlatList, View } from "react-native";
import { getDatabase, off, onValue, ref } from "firebase/database";

import { ChatIcon, ScreenWrapper } from "../../../components";
import Header from "../../../components/header";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatRooms,
  selectUserMeta,
  setChatRooms,
} from "../../../redux/slices/user";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatList({ navigation, route }) {
  const dispatch = useDispatch();
  const db = getDatabase();
  const data = useSelector(selectChatRooms);
  const user = useSelector(selectUserMeta);

  useFocusEffect(
    useCallback(() => {
      fetchRoomsData(user?._id);
    }, [])
  );
  const fetchRoomsData = async (userId) => {
    try {
      let roomRef = ref(db, `users/${userId}/rooms`);

      const handleRoomUpdate = (snapshot) => {
        const room = snapshot.val() || [];
        dispatch(setChatRooms(room));
      };

      onValue(roomRef, handleRoomUpdate);

      // Clean up the listener when the component is unmounted or the user logs out
      return () => {
        if (roomRef) {
          off(roomRef, handleRoomUpdate);
        }
      };
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header navigation={navigation} />}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <ChatIcon data={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
