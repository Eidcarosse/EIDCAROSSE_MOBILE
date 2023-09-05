import React from "react";
import { Text, View } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";

export default function AboutUs({ navigation, route }) {
  const data = [
    {
      paraTitle: "",
      paraDetail:
        "Eidcarosse is a comprehensive online marketplace dedicated to facilitating the buying and selling of vehicles. With a user-friendly interface and powerful search features, Eidcarosse connects individuals looking for vehicles with sellers offering an extensive range of options. Whether you're in the market for a stylish sedan, a powerful truck, a sleek bike, or any other vehicle, Eidcarosse provides a platform that simplifies the entire process.",
      paraType: "para",
    },
    {
      paraTitle: "Buyers",
      paraDetail: [
        "For buyers, Eidcarosse offers a vast selection of vehicles from private sellers and dealerships, ensuring you have access to a wide range of options to suit your preferences and budget",
        "With detailed listings and comprehensive vehicle information, including specifications, mileage, and pricing, you can make informed decisions and find the perfect vehicle that meets your needs.",
      ],
      paraType: "bullets",
    },
    {
      paraTitle: "Sellers",
      paraDetail: [
        "For sellers, Eidcarosse offers a convenient platform to showcase your vehicles to a large and diverse audience of potential buyers.",
        " List your vehicle with detailed descriptions, high-quality images, and competitive pricing, and connect directly with interested buyers.",
        "Eidcarosse empowers sellers to reach a wider market and streamline the selling process, making it easier to find the right buyer for your vehicle.",
      ],
      paraType: "bullets",
    },

    {
      paraTitle: "",
      paraDetail:
        "Eidcarosse prioritizes user experience and ensures a secure and transparent transaction process. The platform provides messaging capabilities, allowing buyers and sellers to communicate directly and negotiate terms. Additionally, Eidcarosse offers a range of verification and safety features to provide peace of mind to all users.",
      paraType: "para",
    },
  ];
  const AboutPara = ({ data }) => {
    console.log(data);
    return (
      <View style={styles.container}>
        {data?.paraTitle && <Text style={styles.title}>{data?.paraTitle}</Text>}
        {data?.paraType == "para" && (
          <Text style={styles.content}>{data?.paraDetail}</Text>
        )}
        {data?.paraType == "bullets" &&
          data.paraDetail.map((item) => (
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                alignSelf: "flex-starts",
              }}
            >
              <View style={styles.dot} />
              <Text style={{ margin: width(1), width: width(80) }}>{item}</Text>
            </View>
          ))}
      </View>
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"About Us"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primery}
      backgroundColor="white"
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        {/* <View style={styles.imageview}>
        <Image source={Icons.tnc} style={styles.image} />
        </View> */}
        {data.map((item, index) => (
          <AboutPara key={index} data={item} />
        ))}
      </View>
    </ScreenWrapper>
  );
}
