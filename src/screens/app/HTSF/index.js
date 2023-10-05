import React from "react";
import { Image, Text, View } from "react-native";
import Icons from "../../../asset/images";
import { Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function HTSF({ navigation, route }) {
  const data = [
    {
      image: Icons.htsf1,
      id: 1,
      title: "Pick the right price",
      detail:
        "When determining the price of an item, consider that price is a significant factor for customers. To ensure you set a reasonable and competitive price, take the time to research similar ads before finalizing your pricing strategy.",
    },
    {
      image: Icons.htsf2,
      id: 2,
      title: "Use great photos",
      detail:
        "Utilize clear and authentic photos of your product or products. Include multiple images from various angles to provide potential buyers with a comprehensive and detailed understanding of your items.",
    },
    {
      image: Icons.htsf3,
      id: 3,
      title: "Provide clear description",
      detail:
        "Offer a clear and detailed description of your product, ensuring that you provide accurate and comprehensive information about your items.",
    },
  ];
  const FastSell = ({ data }) => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={data?.image} />
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.content}>{data?.detail}</Text>
      </View>
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"How to Sell Fast"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      backgroundColor={AppColors.white}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        {data.map((item, index) => (
          <FastSell key={index} data={item} />
        ))}
      </View>
    </ScreenWrapper>
  );
}
