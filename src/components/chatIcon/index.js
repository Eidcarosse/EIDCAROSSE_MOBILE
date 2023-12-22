import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import ScreenNames from "../../routes/routes";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";

export default function ChatIcon({ data }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    !data?.product || !data?.user
  );

  const handlePress = useCallback(() => {
    navigation.navigate(ScreenNames.CHAT, {
      usr: data?.user,
      userRoom: data?.roomId,
      userItem: data?.product,
    });
  });
  return (
    <Fragment>
      <TouchableOpacity style={styles.main} onPress={handlePress}>
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
                "https://res.cloudinary.com/dlkuyfwzu/image/upload/v1695709555/profile_logo_pcsium.png",
            }}
          />
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
              {
                fontWeight: "bold",
                fontSize: width(3.5),
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
              { paddingTop: height(1), fontSize: width(2.5) },
              selectedItem && { color: "lightgrey" },
            ]}
          >
            {data?.lastmsg?.message}
            {data?.lastmsg?.image && (
              <Ionicons name="image" size={width(4)} color={"grey"} />
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
                fontSize: width(2.5),
                width: width(15),
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
            <Text style={{ fontSize: width(3) }}>
              {t("Do you want to delete the chat")}
            </Text>
          </Dialog.Description>
          <Dialog.Button
            label={t("myad.cancel")}
            onPress={() => setVisible(false)}
          />
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
