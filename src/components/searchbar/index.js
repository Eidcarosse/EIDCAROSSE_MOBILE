import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { height, width } from "../../utills/Dimension";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../../routes/routes";
import { useDispatch } from "react-redux";
import { setTitleFilter } from "../../redux/slices/config";
import Button from "../button";
import AppColors from "../../utills/AppColors";
export default function SearchBar({
  search,
  setSearch,
  containerstyle,
  next = false,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const data = [
  //   {
  //     title: "ABC",
  //   },
  //   {
  //     title: "ABC",
  //   },
  //   {
  //     title: "ABC",
  //   },
  //   {
  //     title: "ABC",
  //   },
  // ];
  // const [search, setSearch] = useState("");

  // const renderItem = ({ item }) => (
  //   <Pressable
  //     style={{
  //       backgroundColor: AppColors.white,
  //       padding: width(3),
  //       elevation: 5,
  //       shadowColor: "#000",
  //       shadowOffset: { width: 0, height: 1 },
  //       shadowOpacity: 0.5,
  //       shadowRadius: 2,
  //     }}
  //     onPress={() => setSearch(item?.title)}
  //   >
  //     <Text>{item?.title}</Text>
  //   </Pressable>
  // );
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
          style={{ width: width(63) }}
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

      {/* {search != "" && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: width(90),
            zIndex: 1,
            top: height(5),
          }}
        >
          <FlatList data={data} renderItem={renderItem} />
        </View>
      )} */}
    </View>
  );
}
