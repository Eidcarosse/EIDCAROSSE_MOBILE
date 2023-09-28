import { Entypo, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";
export default function DetailHeader({
  onPressBack,
  onPressHeart,
  onPressShare,
  onPressOption,
  like = true,
  loginuser = false,
}) {
  const [fav, setFav] = useState(false);
  const setMyFav = () => {
    if (!loginuser) {
      alert("Please login first");
    } else setFav(!fav);
  };
  return (
    <View style={styles.container}>
      <View style={styles.menuicon}>
        <TouchableOpacity onPress={onPressBack}>
          <Ionicons name="chevron-back" size={width(6)} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.textdetail}>Details</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* {!like&&<TouchableOpacity 
        style={{marginHorizontal:width(3)}}

        onPress={()=>{setMyFav()}}>
          <AntDesign
            size={width(4)}
            color={fav ? AppColors.primary : "white"}
            name={fav ? "heart" : "hearto"}
          />
        </TouchableOpacity>} */}
        <TouchableOpacity
          style={{ marginHorizontal: width(3) }}
          onPress={onPressShare}
        >
          <Entypo size={width(4)} name="share" color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: width(3) }}>
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
