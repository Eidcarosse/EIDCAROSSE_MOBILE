import { Entypo, Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-native-phone-number-input";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../../src/redux/slices/language";
export default function NumberInput({
  title,
  value,
  setvalue,
  placeholder,
  secure = true,
  containerStyle,
  titlestyle,
  multi = false,
  editable = true,
  require = false,
  keyboardType = "default",
  inputTextStyle,
  autoCapitalize = "none",
}) {
  const { t } = useTranslation();
  const [secureText, setSecureText] = useState(secure);
  const phoneInput = useRef(null);
  const [changeValue, setChangeValue] = useState();
  const lang = useSelector(selectCurrentLanguage).toUpperCase();

  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {title && (
          <Text style={[titlestyle, { fontSize: height(1.8) }]}>
            {t(title)}
          </Text>
        )}
        <View style={styles.innerview}>
          {!secureText ? (
            <PhoneInput
              ref={phoneInput}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              textInputStyle={{ fontSize: height(1.5), padding: 0, margin: 0 }}
              codeTextStyle={{ fontSize: height(1.5), padding: 0, margin: 0 }}
              countryPickerButtonStyle={{
                padding: 0,
                margin: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
                height: height(5),
              }}
              onChangeFormattedText={(text) => {
                setChangeValue(text);
              }}
              placeholder={"XX XXX XX XX"}
              filterProps={{ placeholder: t("commmon.cpholder")}}
              defaultCode={"CH"}
              layout="first"
              // value={waNum}
            />
          ) : (
            <TextInput
              cursorColor={AppColors.primary}
              editable={false}
              autoCapitalize={autoCapitalize}
              style={[
                {
                  paddingVertical: width(2),
                  width: width(80),
                  fontSize: height(1.5),
                },
                inputTextStyle,
                !editable && { color: "grey" },
              ]}
              keyboardType={keyboardType}
              placeholder={t('+41 7XXXXXXXX')}
              multiline={multi}
              value={value}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setSecureText(!secureText);
              if (!secureText) {
                const isValid = phoneInput.current.isValidNumber(changeValue);
                if (isValid) {
                  setvalue(changeValue);
                }
              }
            }}
          >
            <Feather
              name={secureText ? "edit" : "check-square"}
              color={secureText ? "grey" : AppColors.primary}
              size={height(2)}
            />
          </TouchableOpacity>
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
          {t("addPost.require")}
        </Text>
      )}
    </View>
  );
}
