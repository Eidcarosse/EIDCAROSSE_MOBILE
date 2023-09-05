import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import { Menu, MenuItem } from "react-native-material-menu";

import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";

export default function MyCard({ data }) {
  // console.log("indata", data);
  const [isModalVisible, setModalVisible] = useState(false);
  const hideMenu = () => setModalVisible(false);

  const showMenu = () => setModalVisible(true);
  return (
    <View style={styles.main}>
      <View style={styles.imageview}>
        <Image resizeMode="stretch" style={styles.image} source={data?.uri} />
      </View>
      <View style={styles.detail}>
        <View>
          <Text
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: width(3.5) }}
          >
            {data?.name}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            <MaterialIcons name="category" color={"grey"} />
            {data?.category}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            <Entypo name="location-pin" color={"grey"} />
            {data?.location}
          </Text>
          <Text style={{ fontSize: width(2) }}>
            <AntDesign name="eye" color={"grey"} />
            {data?.views} view
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: width(3.5),
              color: AppColors.primery,
              fontWeight: "bold",
            }}
          >
            CHF {data?.chf}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: width(2.5), color: "grey", fontWeight: "bold" }}
          >
            EUR {data?.eur}
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
          <Text style={{ fontSize: width(2.5) }}>Published</Text>
        </TouchableOpacity>
      </View>
      <Menu visible={isModalVisible} onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>Edit</MenuItem>
        <MenuItem onPress={hideMenu}>Delete</MenuItem>
        <MenuItem onPress={hideMenu}>Mark as sold</MenuItem>
      </Menu>
    </View>
  );
}
