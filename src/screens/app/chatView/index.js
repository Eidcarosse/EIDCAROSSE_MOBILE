import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Icons from "../../../asset/images";
import { Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";

export default function ChatView({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: Icons.car,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Chat"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <GiftedChat
          messages={messages}
          style={{ width: width(90) }}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          messagesContainerStyle={{backgroundColor:'red'}}
        />
      </View>
    </ScreenWrapper>
  );
}
