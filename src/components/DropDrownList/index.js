import React, { Fragment, useEffect, useState, useRef, useMemo } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utills/AppColors";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";
import { height, width } from "../../utills/Dimension";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native-gesture-handler";
export default DropDownList = ({
  data = [],
  select,
  setSelect,
  size = 2,
  textAlign,
  color = AppColors.black,
  textStyles,
  textProps,
}) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && show)
      handleScrollToIndex(
        data.findIndex((item) => item == select) > 0
          ? data.findIndex((item) => item == select)
          : 0
      );
  }, [show]);
  const handleScrollToIndex = (index) => {
    flatListRef?.current?.scrollToIndex({ index, animated: true });
  };
  const styles = StyleSheet.create({
    text: {
      fontSize: height(size),
      color: color,
      textAlign: textAlign,
      color: show ? AppColors.primary : "black",
      width: width(80),
    },
  });
  const renderItem = useMemo(() => {
    return ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setSelect(item), setFilter(""), setShow(false);
        }}
        style={[
          {
            padding: height(0.5),
            borderRadius: height(0.3),
            margin: height(0.5),
            backgroundColor: select == item ? "red" : "white",
            ...Platform.select({
              ios: {
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
              },
              android: {
                elevation: 1,
              },
            }),
          },
        ]}
      >
        <Text
          style={{
            color: select == item ? "white" : "black",
            paddingLeft: height(1),
            fontSize: height(2),
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <Fragment>
      <View
        style={{
          backgroundColor: "lightgrey",
          width: width(90),
          paddingVertical: height(1.2),
          paddingHorizontal: height(1.3),
          borderRadius: height(0.5),
          ...Platform.select({
            ios: {
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            },
            android: {
              elevation: 3,
            },
          }),
          margin: height(1),
        }}
      >
        <Pressable
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "lightgrey",
          }}
          onPress={() => setShow(!show)}
        >
          <Text
            style={[styles.text, textStyles]}
            {...textProps}
            numberOfLines={show ? 2 : 1}
          >
            {select}
          </Text>
          {/* <FontAwesome
            name={show ? "chevron-up" : "chevron-down"}
            size={height(2)}
            color={show ? AppColors.primary : "black"}
          /> */}
        </Pressable>
      </View>
      <Modal
        isVisible={show}
        onBackButtonPress={() => setShow(false)}
        onBackdropPress={() => setShow(false)}
        backdropColor="white"
      >
        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: "white",
            paddingBottom: height(2),
          }}
        >
          <View
            style={{
              width: width(100),
              paddingHorizontal: height(2),
              paddingVertical: height(0.5),
              flexDirection: "row",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderColor: "grey",
            }}
          >
            <TextInput
              value={filter}
              onChangeText={setFilter}
              style={{ width: width(90), backgroundColor: "white" }}
            />
            <Pressable
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setShow(!show)}
            >
              <FontAwesome name={"close"} size={height(3)} color={"grey"} />
            </Pressable>
          </View>
          <FlatList
            ref={flatListRef}
            style={{
              width: width(98),
              padding: height(1),
              backgroundColor: "white",
            }}
            data={data.filter((item) =>
              item.toLowerCase().includes(filter.toLowerCase())
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      </Modal>
    </Fragment>
  );
};
