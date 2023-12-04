import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import Button from "../button";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function SearchBar({
  search,
  setSearch,
  containerstyle,
  next = false,
  onPress,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleInputSubmit = () => {
    // Navigate to the next screen here

    next
      ? (navigation.navigate(ScreenNames.LISTDATA, { search: search }),
        setSearch(""))
      : onPress();
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          search ? styles.main : containerstyle,
          { borderColor: search ? AppColors.primary : "black" },
        ]}
      >
        <Ionicons
          name="search"
          style={{ marginHorizontal: width(2) }}
          color={search ? AppColors.primary : "grey"}
          size={width(5)}
        />
        <TextInput
          placeholder={t("searchbar.phsearch")}
          value={search}
          onChangeText={setSearch}
          style={{ width: width(55) }}
          onSubmitEditing={handleInputSubmit}
        />
        {search && (
          <Button
            onPress={handleInputSubmit}
            title={"searchbar.search"}
            containerStyle={{
              flex: 1,
              padding: width(0.1),
              paddingVertical: width(1.5),
              backgroundColor: AppColors.primary,
              borderRadius: width(1),
              marginVertical: width(0.5),
            }}
            textStyle={{
              fontSize: width(3),
              margin: width(0.1),
              padding: width(0.1),
            }}
          />
        )}
      </View>
      {next && search == "" ? (
        <View>
          <TouchableOpacity
            style={{ marginLeft: height(2) }}
            onPress={() => navigation.navigate(ScreenNames.MAP)}
          >
            <Feather name="globe" size={width(7)} color={AppColors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        search != "" && (
          <View>
            <TouchableOpacity
              style={{ marginLeft: height(2) }}
              onPress={() => {
                setSearch(""), !next && onPress();
              }}
            >
              <AntDesign
                name="closesquare"
                size={width(8)}
                color={AppColors.primary}
              />
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
}
