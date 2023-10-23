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
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import { selectUserMeta } from "../../../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";

export default function ChatView({ navigation, route }) {
  const database = getDatabase();
  const adDetail = route?.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // const handleChat = async () => {
  //   dispatch(setProductId(product?._id));
  //   dispatch(setProductUserId(product?.userId?._id));
  //   const data = {
  //     userId: userId,
  //     productUserId: product?.userId?._id,
  //     productId: product?._id,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/chatroom`,
  //       data
  //     );

  //     if (response.status === 200) {
  //       navigation.navigate('ChatScreen'); // Use your navigation logic
  //     }
  //   } catch (error) {
  //     console.error('Error creating chat room:', error);
  //   }
  // };




  const user = useSelector(selectUserMeta);
  const onSend = useCallback((newMessages = []) => {
    const newMessage = messages[0];
    const newMessageRef = push(ref(database, "chatrooms/650afd72021c2ddb1e6df285_650ad42f25b7e2c2d6f17c60_651fa342e245993307909eb0/messages"));
    set(newMessageRef, {
      text: newMessage.text,
      timestamp: Date.now(),
      senderId: user?._id, // Set the sender's user ID here
      senderName: user?.firstName,
    });
  }, []);

  // useEffect(() => {
  //   const messagesRef = ref(database, "chatrooms/650afd72021c2ddb1e6df285_650ad42f25b7e2c2d6f17c60_651fa342e245993307909eb0/messages");

  //   onValue(messagesRef, (snapshot) => {
  //     const messageData = snapshot.val();
  //     if (messageData) {
  //       // Convert the message data to an array and sort it in descending order
  //       const messageList = Object.values(messageData)
  //         .map((message) => ({
  //           _id: message.timestamp, // Use a unique identifier for each message
  //           text: message.text,
  //           createdAt: new Date(message.timestamp),
  //           user: {
  //             _id: message.senderId, // Use the sender's user ID here
  //             name: message.senderName, // Set the sender's name
  //           },
  //         }))
  //         .reverse(); // Reverse the order to display the newest messages at the bottom
  //       setMessages(messageList);
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: Icons.car,
  //       },
  //     },
  //   ]);
  // }, []);

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

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);
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
        <AdView detail={adDetail} />
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
