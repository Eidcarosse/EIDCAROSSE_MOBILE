import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { width } from "../../utills/Dimension";
import styles from "./styles";

export default function SearchBar({ search, setSearch, containerstyle }) {
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
  //       backgroundColor: "white",
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

  return (
    <View style={styles.container}>
      <View style={[styles.main, containerstyle]}>
        <Ionicons
          name="search"
          style={{ marginHorizontal: width(2) }}
          color={"grey"}
          size={width(5)}
        />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{ width: width(80) }}
        />
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
