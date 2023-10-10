import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import {
  Avatar,
  Bubble,
  GiftedChat,
  MessageText,
  Time,
} from "react-native-gifted-chat";
import Icons from "../../../asset/images";
import { AdView, Button, Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";

export default function ChatView({ navigation, route }) {

const adDetail=  route?.params
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

  const renderBubble = (props) => {
    // Customize the style of the message bubble
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          right: {
            backgroundColor: "#FAD0D0",
            marginVertical: width(1), // Change the background color for sent messages
          },
          left: {
            marginVertical: width(1), // Change the background color for received messages
          },
        }}
      />
    );
  };
  const renderMessageText = (props) => {
    return (
      <MessageText
        {...props}
        textStyle={{
          right: {
            color: "black",
            // Change the text color for sent messages
          },
          left: {
            color: "black", // Change the text color for received messages
          },
        }}
      />
    );
  };
  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={{
          width: 100, // Change the width of the avatar
          height: 100, // Change the height of the avatar
          margin: 5, // Change the margin around the avatar
        }}
      />
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: "black", // Change the text color for sent message times
          },
          left: {
            color: "black", // Change the text color for received message times
          },
        }}
      />
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Chat"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <AdView detail={adDetail}/>
        <GiftedChat
          messages={messages}
          style={{ width: width(90) }}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          renderTime={renderTime}
          // renderAvatar={renderAvatar}
        />
      </View>
    </ScreenWrapper>
  );
}
