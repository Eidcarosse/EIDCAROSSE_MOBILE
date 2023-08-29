import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, View, TextInput, Text, TouchableOpacity } from "react-native";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import AppColors from "../../utills/AppColors";

export default function Input({
  title,
  value,
  setvalue,
  placeholder,
  secure = false,
}) {
  const [secureText, setSecureText] = useState(secure);
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.innerview}>
        <TextInput
          style={{ paddingVertical: width(2), width: width(80) }}
          placeholder={placeholder}
          secureTextEntry={secureText}
          value={value}
          onChangeText={setvalue}
        />
        {secure && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Entypo
              name={secureText ? "eye-with-line" : "eye"}
              color={secureText ? "grey" : AppColors.primery}
              size={width(4)}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
