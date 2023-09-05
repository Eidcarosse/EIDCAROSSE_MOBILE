import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";

export default function ChatIcon({ data, onPress }) {
  // console.log("indata", data);
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.main}>
        <View style={styles.imageview}>
          <Image resizeMode="cover" style={styles.image} source={data?.uri} />
        </View>
        <View style={styles.detail}>
          <Text
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: width(3.5) }}
          >
            {data?.name}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: width(2.5) }}>
            Hi
          </Text>
          <Text />
        </View>

        <View style={styles.icons}>
          <Text
            numberOfLines={1}
            style={{ fontWeight: "bold", fontSize: width(2.5) }}
          >
            {data?.date}
          </Text>
          <Text />
        </View>
      </View>
    </TouchableOpacity>
  );
}
