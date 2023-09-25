import {
  AntDesign,
  Entypo,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";
export default function DetailHeader({
  onPressBack,
  onPressHeart,
  onPressShare,
  onPressOption,
  like=true
}) {
  const [fav, setFav] = useState(false);
  const setMyFav = () => {
    setFav(!fav);
  };
  return (
    <View style={styles.container}>
      <View style={styles.menuicon}>
        <TouchableOpacity onPress={onPressBack} style={{}}>
          <Ionicons name="chevron-back" size={width(5)} color={"white"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {!like&&<TouchableOpacity 
        style={{marginHorizontal:width(3)}}

        onPress={()=>{setMyFav()}}>
          <AntDesign
            size={width(4)}
            color={fav ? AppColors.primary : "white"}
            name={fav ? "heart" : "hearto"}
          />
        </TouchableOpacity>}
        <TouchableOpacity
        style={{marginHorizontal:width(3)}}

        onPress={onPressShare}
        >
          <Entypo size={width(4)} name="share" color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
        style={{marginHorizontal:width(3)}}
        >
          <SimpleLineIcons
            size={width(4)}
            name="options-vertical"
            color={"white"}
          />
        </TouchableOpacity>
        {/* <Ionicons name="chevron-back" size={width(7)} color={"white"} /> */}
      </View>
    </View>
  );
}
