import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import Button from "../button";
import styles from "./styles";
export default function SearchBar({
  search,
  setSearch,
  containerstyle,
  next = false,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleInputSubmit = () => {
    // Navigate to the next screen here

    next &&
      (navigation.navigate(ScreenNames.LISTDATA, { search: search }),
      setSearch(""));
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.main,
          { borderColor: search ? AppColors.primary : "black" },
          containerstyle,
        ]}
      >
        <Ionicons
          name="search"
          style={{ marginHorizontal: width(2) }}
          color={search ? AppColors.primary : "grey"}
          size={width(5)}
        />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{ width: width(50) }}
          onSubmitEditing={handleInputSubmit}
        />
        {search && (
          <Button
            onPress={handleInputSubmit}
            title={"search"}
            containerStyle={{
              width: width(15),
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
      <View>
        <TouchableOpacity
          style={{ marginLeft: height(2) }}
          onPress={() => navigation.navigate(ScreenNames.MAP)}
        >
          <Feather
            name="globe"
            size={width(7)}
            color={AppColors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
