import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import { Menu, MenuItem } from "react-native-material-menu";

import { useDispatch, useSelector } from "react-redux";
import { deleteAdById } from "../../backend/api";
import { getOwneAd } from "../../backend/auth";
import { setAppLoader } from "../../redux/slices/config";
import { selectUserMeta, setUserAds } from "../../redux/slices/user";
import { width } from "../../utills/Dimension";

export default function MyCard({ data }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const userid = userInfo?._id;

  const getData = useCallback(async (id) => {
    let d = await getOwneAd(id);
    if (d) dispatch(setUserAds(d));
    else dispatch(setUserAds([]));
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const hideMenu = () => setModalVisible(false);

  const showMenu = () => setModalVisible(true);

  const deleteAd = async (id) => {
    dispatch(setAppLoader(true));
    try {
      const data = await deleteAdById(id);
      dispatch(setAppLoader(false));

      await getData(userid);
    } catch (error) {
      console.log("Error:", error);
      dispatch(setAppLoader(false));
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.imageview}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: data?.images[0] }}
        />
      </View>
      <View style={styles.detail}>
        <View>
          <Text numberOfLines={1} style={styles.titletext}>
            {data?.title}
          </Text>
          <View style={styles.categoryview}>
            <AntDesign name="clockcircleo" color={"grey"} size={width(4)} />
            <Text numberOfLines={1} style={styles.textcategory}>
              {data?.category}
            </Text>
          </View>

          <View style={styles.categoryview}>
            <AntDesign name="eye" color={"grey"} size={width(4)} />
            <Text numberOfLines={2} style={styles.textcategory}>
              129 Views
            </Text>
          </View>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.chf}>
            CHF {data?.price}
          </Text>
          <Text numberOfLines={1} style={styles.eur}>
            EUR {data?.price}
          </Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity
          style={{ paddingVertical: 3 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Entypo size={width(4)} name="dots-three-vertical" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "grey",
            paddingHorizontal: width(3),
            padding: width(1),
            borderRadius: width(5),
          }}
          disabled={true}
        >
          <Text style={{ fontSize: width(2) }}>Published</Text>
        </TouchableOpacity>
      </View>
      <Menu visible={isModalVisible} onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>Edit</MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu(), deleteAd(data._id);
          }}
        >
          Delete
        </MenuItem>
        <MenuItem onPress={hideMenu}>Mark as sold</MenuItem>
      </Menu>
    </View>
  );
}
