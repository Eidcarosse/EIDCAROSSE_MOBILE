import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppColors from "../../utills/AppColors";
import styles from "./styles";
import Button from "../button";
import Icons from "../../asset/images";
import { width } from "../../utills/Dimension";
import ScreenNames from "../../routes/routes";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const AdView = ({ detail, onPressView }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ScreenNames.DETAIL, detail)}
      style={styles.container}
    >
      {detail?.images && (
        <Image
          style={styles.image}
          source={{ uri: detail?.images[0] }}
          resizeMode="cover"
        />
      )}
      <View style={styles.textview}>
        <Text style={styles.title} numberOfLines={1}>
          {detail?.title}
        </Text>
        {detail?.subCategory ? (
          <Text style={styles.price}>{detail?.subCategory} </Text>
        ) : (
          <Text style={styles.price}>{detail?.category} </Text>
        )}
       
      </View>
      <Entypo name="chevron-right" 
      size={width(10)}
      />
    </TouchableOpacity>
  );
};

export default AdView;
