import { Entypo, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";
import { Menu, MenuItem } from "react-native-material-menu";
import { useTranslation } from "react-i18next";

export default function DetailHeader({
  onPressBack,
  onPressShare,
  onPressOption,
  like = true,
  loginuser = false,
}) {
  const {t}=useTranslation();
  const [fav, setFav] = useState(false);
  const setMyFav = () => {
    if (!loginuser) {
      alert("Please login first");
    } else setFav(!fav);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const hideMenu = () => setModalVisible(false);

  const showMenu = () => setModalVisible(true);
  return (
    <View style={styles.container}>
      <View style={styles.menuicon}>
        <TouchableOpacity onPress={onPressBack}>
          <Ionicons
            name="chevron-back"
            size={width(8)}
            color={AppColors.white}
          />
        </TouchableOpacity>
        <Text style={styles.textdetail}>{t("detailheader.title")}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: width(3) }}
          onPress={onPressShare}
        >
          <Entypo size={width(4)} name="share" color={AppColors.white} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ marginHorizontal: width(3) }}
          onPress={showMenu}
        >
          <SimpleLineIcons
            size={width(4)}
            name="options-vertical"
            color={AppColors.white}
          />
        </TouchableOpacity> */}
        {/* <Menu visible={isModalVisible} onRequestClose={hideMenu}>
          <MenuItem
            onPress={() => {
              hideMenu();
            }}
          >
            Block
          </MenuItem>
        </Menu> */}
        {/* <Ionicons name="chevron-back" size={width(7)} color={AppColors.white} /> */}
      </View>
    </View>
  );
}
