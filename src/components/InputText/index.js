import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import styles from "./styles";

export default function Input({
  title,
  value,
  setvalue,
  placeholder,
  secure = false,
  containerStyle,
  titlestyle,
  multi = false,
}) {
  const [secureText, setSecureText] = useState(secure);
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={titlestyle}>{title}</Text>}
      <View style={styles.innerview}>
        <TextInput
          style={{ paddingVertical: width(2), width: width(80) }}
          placeholder={placeholder}
          secureTextEntry={secureText}
          multiline={multi}
          value={value}
          onChangeText={setvalue}
        />
        {secure && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Entypo
              name={secureText ? "eye-with-line" : "eye"}
              color={secureText ? "grey" : AppColors.primary}
              size={width(4)}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
