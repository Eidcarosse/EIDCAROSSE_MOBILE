import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import ScreenNames from "../../routes/routes";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import Button from "../button";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
var items = [
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "Java",
  },
  {
    id: 3,
    name: "Ruby",
  },
  {
    id: 4,
    name: "React Native",
  },
  {
    id: 5,
    name: "PHP",
  },
  {
    id: 6,
    name: "Python",
  },
  {
    id: 7,
    name: "Go",
  },
  {
    id: 8,
    name: "Swift",
  },
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "Java",
  },
  {
    id: 3,
    name: "Ruby",
  },
  {
    id: 4,
    name: "React Native",
  },
  {
    id: 5,
    name: "PHP",
  },
  {
    id: 6,
    name: "Python",
  },
  {
    id: 7,
    name: "Go",
  },
  {
    id: 8,
    name: "Swift",
  },
];
export default function SearchBar({
  search,
  setSearch,
  containerstyle,
  next = false,
  onPress,
}) {
  const { t } = useTranslation();
  const inputRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load the search history from AsyncStorage when the component mounts
    loadSearchHistory();
    !next && inputRef.current.focus();
  }, []);

  useEffect(() => {
    // Save the current search to the search history whenever it changes
    saveSearchHistory();
  }, [searchHistory]);

  const saveSearchHistory = async () => {
    try {
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(searchHistory)
      );
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const savedSearchHistory = await AsyncStorage.getItem("searchHistory");
      if (savedSearchHistory !== null) {
        setSearchHistory(JSON.parse(savedSearchHistory));
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  const handleSearch = () => {
    const newSearchHistory = [search, ...searchHistory];
    setSearchHistory(newSearchHistory);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 2000);
  };
  const handleDelete = (index) => {
    // Delete the search at the specified index
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);
  };
  const handleInputSubmit = () => {
    let a = searchHistory.find((item) => item == search);
    // // Navigate to the next screen here
    if (!a) handleSearch();

    navigation.navigate(ScreenNames.LISTDATA, { search: search }),
      setSearch("");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.flatcontainer}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width(77),
          }}
          onPress={() => {
            setSearch(item);
          }}
        >
          <Entypo name="back-in-time" size={height(2.3)} color={"grey"} />
          <Text style={{ fontSize: height(2), width: width(70), color:'grey',fontWeight:'500'}}>
            {item}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: height(2), padding: height(0.5) }}
          onPress={() => {
            handleDelete(index);
          }}
        >
          <AntDesign name="close" size={height(2)} color={"grey"} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Fragment>
      <View style={styles.container}>
        <View
          style={[
            search ? styles.main : containerstyle,
            { borderColor: search ? AppColors.primary : "black" },
          ]}
        >
          <Ionicons
            name="search"
            style={{ marginHorizontal: height(1) }}
            color={search ? AppColors.primary : "grey"}
            size={height(2.5)}
          />
          <TextInput
            ref={inputRef}
            blurOnSubmit={true}
            autoCapitalize="none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={t("searchbar.phsearch")}
            value={search}
            onChangeText={setSearch}
            style={{ width: width(55), fontSize: height(1.5) }}
            onSubmitEditing={handleInputSubmit}
          />
        </View>
        {search && (
          // <Button
          //   onPress={handleInputSubmit}
          //   title={"searchbar.search"}
          //   containerStyle={styles.serachBtn}
          //   textStyle={styles.searchTxt}
          // />
          <TouchableOpacity
            style={{
              marginLeft: height(1),
              backgroundColor: "red",
              paddingHorizontal: height(0.4),
              paddingVertical:height(.2),
              borderRadius: 3,
            }}
            onPress={handleInputSubmit}
          >
            <Ionicons
              name="search"
              size={height(2.5)}
              color={AppColors.white}
            />
          </TouchableOpacity>
        )}
        {search != "" && (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
            }}
          >
            <AntDesign
              name="closesquare"
              size={height(3.5)}
              color={AppColors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      {!next && (
        <View style={styles.flatView}>
          <FlatList
            data={searchHistory.filter((item) =>
              item.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
    </Fragment>
  );
}
