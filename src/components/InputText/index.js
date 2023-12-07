import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function Input({
  title,
  value,
  setvalue,
  placeholder,
  secure = false,
  containerStyle,
  titlestyle,
  multi = false,
  editable = true,
  require = false,
  keyboardType = "default",
}) {
  const { t } = useTranslation();
  const [secureText, setSecureText] = useState(secure);
  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {title && <Text style={[titlestyle]}>{t(title)}</Text>}
        <View style={styles.innerview}>
          <TextInput
            editable={editable}
            style={{
              paddingVertical: width(2.5),
              width: width(80),
              fontSize: width(4),
            }}
            keyboardType={keyboardType}
            placeholder={t(placeholder)}
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
      {require && (
        <Text
          style={{
            color: AppColors.red,
            fontSize: width(2.5),
            paddingLeft: width(5),
          }}
        >
          {require}
        </Text>
      )}
    </View>
  );
}
