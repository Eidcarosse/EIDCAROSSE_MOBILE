import { FontAwesome } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import { Menu, MenuItem } from "react-native-material-menu";

import { AntDesign } from "@expo/vector-icons";
export default function NumberInput({
  showBtn = true,
  title,
  value,
  setvalue,
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
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {title && (
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Text
              style={[
                titlestyle,
                { fontSize: height(1.8), color: AppColors.black },
              ]}
            >
              {t(title)}
            </Text>
            {secureText && (
              <TouchableOpacity
                style={{ marginLeft: width(5) }}
                onPress={() => {
                  setModalVisible(true);
                  setTimeout(() => {
                    setModalVisible(false);
                  }, 5000);
                }}
              >
                <AntDesign
                  name="infocirlceo"
                  size={height(2)}
                  color={AppColors.black}
                />
              </TouchableOpacity>
            )}
          </View>
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
                showBtn && setChangeValue(text);
                !showBtn && setvalue(text);
              }}
              placeholder={"XX XXX XX XX"}
              filterProps={{ placeholder: t("commmon.cpholder") }}
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
                  color: AppColors.black,
                },
                inputTextStyle,
                !editable && { color: "grey" },
              ]}
              keyboardType={keyboardType}
              placeholder={t("+41 7XXXXXXXX")}
              multiline={multi}
              value={value}
            />
          )}

          {showBtn && (
            <TouchableOpacity
            style={{padding:height(1)}}
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
              <FontAwesome
                name={secureText ? "edit" : "check-square"}
                color={secureText ? "grey" : AppColors.primary}
                size={height(2)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isModalVisible && (
        <View
          style={{
            backgroundColor: AppColors.white,
            width: width(75),
            position: "absolute",
            left: width(20),
            padding: width(2),
            borderWidth: 1,
            borderColor: "grey",
            zIndex: 100,
            borderRadius: height(0.5),
          }}
        >
          <Text style={{ color: "grey" ,fontWeight:'bold'}}>
         {t('editprofile.msg')}
          </Text>
        </View>
      )}
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
