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

const AdView = ({ detail, onPressView }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: detail?.images[0] }}
        resizeMode="cover"
      />
      <View style={styles.textview}>
        <Text style={styles.title} numberOfLines={1}>{detail?.title}</Text>
        <Text style={styles.price}>CHF {detail?.price} </Text>
      </View>
      <Button
        title={"View Ad"}
        containerStyle={styles.button}
        onPress={() => {
          navigation.navigate(ScreenNames.DETAIL, detail);
        }}
      />
    </View>
  );
};

export default AdView;
