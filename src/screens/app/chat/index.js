import React from "react";
import { FlatList, View } from "react-native";
import Icons from "../../../asset/images";
import { ChatIcon, ScreenWrapper } from "../../../components";
import Header from "../../../components/header";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";
import { useSelector } from "react-redux";
import { selectChatRooms } from "../../../redux/slices/user";


export default function ChatList({ navigation, route }) {
  const data = useSelector(selectChatRooms)
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
            <ChatIcon
              data={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
