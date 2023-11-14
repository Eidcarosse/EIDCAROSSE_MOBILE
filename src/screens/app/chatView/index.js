import { useDispatch, useSelector } from "react-redux";
import { height, width } from "../../../utills/Dimension";
import { AdView, DropDownMenu } from "../../../components";
import { selectUserMeta, setChatRooms } from "../../../redux/slices/user";
import React, { useCallback, useEffect, useState } from "react";
import {
  Actions,
  Bubble,
  GiftedChat,
  MessageText,
  Time,
} from "react-native-gifted-chat";
import database from "../../../../index";
import { get, onValue, push, ref, set } from "firebase/database";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  uploadBytes,
} from "@firebase/storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { getDataofAdByID } from "../../../backend/api";
import { Button, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import axios from "axios";
import ScreenNames from "../../../routes/routes";

function ChatView({ route }) {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState();
  const [roomID, setRoomID] = useState(route?.params.userRoom, roomID);
  const [items, setItems] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [online, setOnline] = useState();
  const [image, setImage] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const usrData = route.params?.usr;
  const user = useSelector(selectUserMeta);
  useEffect(() => {
    myfuntion();
  }, [roomID]);
  useEffect(() => {
    if (!(route?.params?.userRoom == null)) {
      console.log("set room id", route?.params?.userRoom);
      setRoomID(route?.params?.userRoom);
    }
    getItems();
    setReceiver(route.params?.usr);
    getStatus(route.params.usr?._id);
    // getItems();
  }, []);
  useEffect(() => {
    const userStatusRef = ref(
      database,
      `users/${route.params.usr?._id}/online`
    );
    onValue(userStatusRef, (snapshot) => {
      const status = snapshot.val();
      setOnline(status);
    });
  }, [user?._id]);

  const myfuntion = async () => {
    if (roomID) {
      const messagesRef = ref(
        database,
        `chatrooms/${
          route?.params?.userRoom != null ? route?.params?.userRoom : roomID
        }/messages`
      );
      onValue(messagesRef, (snapshot) => {
        const messageData = snapshot.val();
        if (messageData) {
          // Convert the message data to an array and sort it in descending order
          const messageList = Object.values(messageData)
            .map((message) => {
              if (message.images) {
                return {
                  _id: message.timestamp, // Use a unique identifier for each message
                  image: message.images,
                  createdAt: new Date(message.timestamp),
                  user: {
                    _id: message.senderId, // Use the sender's user ID here
                  },
                };
              } else {
                return {
                  _id: message.timestamp, // Use a unique identifier for each message
                  text: message.text,
                  createdAt: new Date(message.timestamp),
                  user: {
                    _id: message.senderId, // Use the sender's user ID here
                  },
                };
              }
            })
            .reverse(); // Reverse the order to display the newest messages at the bottom
          setMessages(messageList);
        }
      });
    }
  };
  const renderBubble = (props) => {
    // Customize the style of the message bubble
    return (
      <Bubble
        key={props.index}
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
            backgroundColor: "lightgray",
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
      <View>
        <Image
          source={{ uri: receiver?.image }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>
    );
  };

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

  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={{
        position: "absolute",
        right: width(20),
        bottom: width(1),
        zIndex: 9999,
      }}
      onPressActionButton={() => {
        setImgModal(true);
      }}
      icon={() => (
        <Ionicons name="camera" size={width(7)} color={AppColors.primary} />
      )}
    />
  );

  const renderMessageImage = (props) => {
    if (props.currentMessage.image) {
      return (
        <View
          style={{
            borderRadius: 15,
            padding: 2,
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {props.currentMessage.image &&
            props.currentMessage.image.map((item) => {
              return (
                <View
                  style={{ width: 72, height: 72, backgroundColor: "white" }}
                >
                  <Image
                    source={{
                      uri: item,
                    }}
                    style={{ width: 70, height: 70, marginRight: 2 }}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
        </View>
      );
    }
    return null;
  };

  const openCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({})
        .then((a) => {
          const selectedImages = a?.assets.map((imageUri) => {
            console.log("Image", imageUri);
            if (image?.length < 5) {
              return Platform.OS === "android"
                ? imageUri.uri
                : imageUri.uri.replace("file://", "");
            }
          });

          setImage([...image, ...selectedImages]);
          setImageModal(true);
        })
        .catch((e) => console.log("my log", e));
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  const openGallery = async () => {
    setTimeout(async () => {
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      })
        .then((a) => {
          const selectedImages = a?.assets.map((imageUri) => {
            if (image?.length < 5) {
              return Platform.OS === "android"
                ? imageUri.uri
                : imageUri.uri.replace("file://", "");
            }
          });

          setImage([...image, ...selectedImages]);
          setImageModal(true);
        })
        .catch((e) => console.log("my log", e));
    }, 1000);
  };

  function openPicker(type = 0) {
    setImgModal(false);
    setTimeout(type == 0 ? openCamera : openGallery, 1000);
  }

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

  //Simple message acurate code

  const onSend = useCallback(async (messages = []) => {
    console.log("Sending");
    const newMessage = messages[0];

    if (user?._id == route.params.usr?._id) {
      //flash msg
    } else {
      if (
        (route.params?.userRoom == null ||
          route.params?.userRoom == undefined) &&
        roomID == null
      ) {
        console.log("====================================");
        console.log("room created");
        console.log("====================================");
        let roomNew = `${user?._id}_${route.params.usr?._id}_${route.params?.userItem}`;
        setRoomID(roomNew);
        const newMessageRef = push(
          ref(database, `chatrooms/${roomNew}/messages`)
        );

        set(newMessageRef, {
          text: newMessage.text,
          timestamp: Date.now(),
          senderId: user?._id, // Set the sender's user ID here
        });
        const lastReadRef = ref(
          database,
          `chatrooms/${roomNew}/lastRead/${user?._id}`
        );
        await set(lastReadRef, Date.now());

        const lastRead = ref(
          database,
          `chatrooms/${roomNew}/lastRead/${route.params.usr?._id}`
        );
        await set(lastRead, Date.now());

        await setRooms(roomNew, route.params.usr?._id);
        await setRooms(roomNew, user?._id);
      } else {
        console.log("====================================");
        console.log("else runing", roomID);
        console.log("====================================");
        const newMessageRef = push(
          ref(database, `chatrooms/${roomID}/messages`)
        );

        set(newMessageRef, {
          text: newMessage.text,
          timestamp: Date.now(),
          senderId: user?._id, // Set the sender's user ID here
        });
        const lastReadRef = ref(
          database,
          `chatrooms/${roomID}/lastRead/${user?._id}`
        );
        await set(lastReadRef, Date.now());
      }
    }
  }, []);

  const getBlobFromUri = async (uri) => {
    console.log("Executing Blob");
    try {
      const response =fetch(uri);
      const blob = await response.data;
      console.log("Blob Created");
      return blob;
    } catch (error) {
      console.error("Error fetching and creating blob:", error);
      throw error;
    }
  };

  const saveImages = async () => {
    const imageUrls = [];
    const storage = getStorage();
    const newMessageRef = push(ref(database, `chatrooms/${roomID}/messages`));
    console.log(newMessageRef);
    for (const imageUri of image) {
      try {
        const split = imageUri.split("/");
        const name = split.pop();
        const imageRef = storageRef(
          storage,
          `chatrooms/${roomID}/images/${name}`
        );

        const metadata = {
          contentType: "image/jpeg/jpg/png",
        };

        // Get the blob from the image URI
        console.log("Getting Blob", imageUri);
        const imageBlob = await getBlobFromUri(imageUri);

        // Use uploadBytesResumable to upload the blob
        console.log("Blob Received", imageBlob);
        const uploadTask = uploadBytesResumable(imageRef, imageBlob, metadata);

        // Wait for the upload task to complete
        console.log("Image Uploading");
        const snapshot = await uploadTask;

        if (snapshot.state === "success") {
          console.log("Image Uploaded");
          const downloadUrl = await getDownloadURL(imageRef);
          if (downloadUrl) {
            imageUrls.push(downloadUrl);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error appropriately, e.g., show an error message to the user.
      }
    }

    if (imageUrls.length > 0) {
      const messageData = {
        images: imageUrls,
        timestamp: Date.now(),
        senderId: user?._id,
      };

      try {
        await set(newMessageRef, messageData);
      } catch (error) {
        console.error("Error setting new message:", error);
        // Handle the error appropriately, e.g., show an error message to the user.
      }
    }

    setImageModal(false);
    setImage([]);
  };
  // const saveImages = async () => {
  //   const imageUrls = [];
  //   const storage = getStorage();
  //   for (const img of image) {
  //     // Create image storage
  //     const split = img.split("/");
  //     const name = split.pop();
  //     const imageRef = storageRef(
  //       storage,
  //       `chatrooms/${roomID}/images/${name}`
  //     );

  //     // upload image
  //     await uploadBytes(imageRef, img).catch((err) => {
  //       console.log("Error uploading images:", err);
  //     });

  //     // get the download url
  //     const downloadURL = await getDownloadURL(imageRef).catch((err) => {
  //       console.log("Error getting download URL:", err);
  //     });

  //     if (downloadURL) {
  //       imageUrls.push(downloadURL);
  //     }

  //     if (image.length === imageUrls.length) {
  //       // // dbref for the database reference
  //       const messageRef = ref(database, `chatrooms/${roomID}/messages`);

  //       const newMessageRef = push(messageRef);
  //       set(newMessageRef, {
  //         senderId: user?._id,
  //         images: imageUrls,
  //         timestamps: Date.now(),
  //       });
  //     }
  //     setImageModal(false);
  //     // // Clear the selected images after sending
  //     setImage([]);
  //   }
  // };

  const getItems = async () => {
    const response = await getDataofAdByID(route.params?.userItem);
    setSelectedItem(response);
  };

  const getStatus = async (receiverId) => {
    const dataRef = ref(database, `users/${receiverId}/online`);
    await get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setOnline(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const closeModal = () => {
    setImageModal(false);
    setImage([]);
  };

  return (
    <ScreenWrapper statusBarColor={AppColors.white} barStyle="dark-content">
      <View style={styles.container}>
        <View style={styles.account_View}>
          <TouchableOpacity style={styles.icon_Style} onPress={handleBack}>
            <MaterialIcons name="arrow-back-ios" size={width(7)} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.OTHERPROFILE, {
                user: usrData,
              });
            }}
          >
            <Image
              source={{ uri: usrData?.image }}
              style={styles.image_Style}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.account_Text}>{usrData?.firstName}</Text>
            {online ? (
              <View style={styles.online_View}>
                <View style={styles.online_Indicator}></View>
                <Text style={styles.online_Text}>Online</Text>
              </View>
            ) : (
              <View style={styles.online_View}>
                <View
                  style={{ ...styles.online_Indicator, backgroundColor: "red" }}
                ></View>
                <Text style={styles.online_Text}>Offline</Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <AdView detail={selectedItem} />
        </View>

        <GiftedChat
          onSend={onSend}
          messages={messages}
          user={{
            _id: user?._id, // Use a unique user ID here
          }}
          renderAvatar={renderAvatar}
          renderActions={renderActions}
          renderMessageImage={renderMessageImage}
          renderMessageText={renderMessageText}
          renderTime={renderTime}
          renderBubble={renderBubble}
        />

        <View>
          <Modal
            visible={imageModal}
            animationIn="fadeInUpBig"
            animationInTiming={500}
            backdropColor="black"
            transparent={true}
            hasBackdrop={true}
          >
            <View style={styles.modalContainer}>
              <Button title="Close" onPress={closeModal} />
              <TouchableOpacity
                onPress={closeModal}
                style={{ margin: width(5) }}
              >
                <MaterialIcons name="close" size={width(7)} color="white" />
              </TouchableOpacity>
              {image &&
                image.map((img) => {
                  return (
                    <Image
                      source={{
                        uri: img,
                        width: width(90),
                        height: height(70),
                        alignSelf: "center",
                      }}
                      resizeMode="contain"
                    />
                  );
                })}

              {/* <Button title="Send" onPress={saveImages} /> */}
            </View>
          </Modal>
        </View>
        <DropDownMenu
          isVisible={imgModal}
          firstBtnText="Take Photo"
          secondBtnText="Choose from Library"
          onPressFirstBtn={() => {
            openPicker(0);
          }}
          onPressSecondBtn={() => {
            openPicker(1);
          }}
          onClose={() => setImgModal(false)}
        />
      </View>
    </ScreenWrapper>
  );
}

export default ChatView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height(1),
  },
  account_View: {
    width: width(90),
    height: height(6),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: height(1),
    marginBottom: height(1),
  },
  icon_Style: {
    fontSize: 20,
    width: width(10),
    flexDirection: "row",
    alignItems: "center",
  },
  image_Style: {
    width: width(13),
    height: height(6),
    borderRadius: width(20),
    borderWidth:width(.3),
    borderColor:AppColors.primary
  },
  account_Text: {
    marginLeft: width(5),
    fontSize: 20,
    fontWeight: "600",
  },
  online_View: {
    marginLeft: width(5),
    flexDirection: "row",
    alignItems: "center",
  },
  online_Text: {
    fontSize: 12,
    paddingLeft: 5,
  },
  online_Indicator: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "green",
  },
  item_View: {
    width: width(95),
    marginLeft: width(2),
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  ad_Btn: {
    width: width(20),
    height: height(4),
    backgroundColor: "#13E890",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  title_Text: {
    fontSize: 18,
    fontWeight: "600",
  },
  price_Text: {
    fontSize: 14,
    fontWeight: "700",
    color: "#13E890",
  },

  modalContainer: {
    alignSelf: "center",
    width: width(100),
    height: height(100),
    backgroundColor: "black",
    justifyContent: "center",
  },
});
