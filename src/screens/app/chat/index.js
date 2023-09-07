import React from "react";
import { FlatList, View } from "react-native";
import Icons from "../../../asset/images";
import { ChatIcon, ScreenWrapper } from "../../../components";
import Header from "../../../components/header";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function ChatList({ navigation, route }) {
  const data = [
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Usama",
      uri: Icons.car,
      date: "2023-9-1",
    },
    {
      name: "Us",
      uri: Icons.car,
      date: "2023-9-1",
    },
  ];
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
              onPress={() => {
                navigation.navigate(ScreenNames.CHAT);
              }}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScreenWrapper>
  );
}
