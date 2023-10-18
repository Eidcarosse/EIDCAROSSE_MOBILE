import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import Icons from "../../asset/images";
import { getAllData } from "../../backend/api";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import CardView from "../CardView";
import styles from "./styles";

export default function RelatedAd({ category }) {
  const [data, setData] = useState([]);
  const [refreshing, onRefresh] = useState(false);

  const queryParams = {
    category: category || "",
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    onRefresh(true);
    let d = await getAllData(queryParams);
    if (d) {
      setData(d);
    } else {
      setData([]);
    }
    onRefresh(false);
  };
  const renderItem = ({ item }) => (
    <View style={{ width: width(100), alignItems: "center" }}>
      <CardView data={item} />
    </View>
  );
  const emptyView = () => (
    <View style={styles.emptyview}>
      {refreshing ? (
        <ActivityIndicator size={"large"} color={AppColors.primary} />
      ) : (
        <Image source={Icons.empty} style={styles.emptyimage} />
      )}
    </View>
  );
  return (
    <View style={styles.main}>
      <View style={styles.titleview}>
        <Text style={{ fontSize: width(4), fontWeight: "bold" }}>
          Related Ads
        </Text>
      </View>
      <View style={{ width: width(100), alignItems: "center" }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={emptyView}
        />
      </View>
    </View>
  );
}