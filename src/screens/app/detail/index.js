import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import MapView from "react-native-maps";
import Icons from "../../../asset/images";
import {
  DetailFooter,
  DetailHeader,
  IconButton,
  ScreenWrapper,
} from "../../../components";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
export default function Detail({ navigation, route }) {
  const data = route?.params;
  //  console.log("detail", data.image);
   const img=data.image.map((item)=>{ return{img:item}})
   console.log("detail", img);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <DetailHeader onPressBack={() => navigation.goBack()} />
      )}
      footerUnScrollable={() => <DetailFooter />}
      statusBarColor={"rgba(128, 128, 128,5)"}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageview}>
          {/* <Image resizeMode="contain" style={styles.image} source={data?.uri} /> */}
          <ImageSlider
            data={img}
            indicatorContainerStyle={{ color: AppColors.primary }}
            autoPlay={false}
            caroselImageStyle={{ resizeMode: 'contain' }}
            activeIndicatorStyle={{ backgroundColor: AppColors.primary }}
            closeIconColor="white"
            
            //onItemChanged={(item) => console.log("item", item)}
          />
        </View>
        <View style={styles.nameview}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                color: AppColors.primary,
                fontWeight: "bold",
              }}
            >
              CHF {data?.price}
            </Text>
            <Text
              numberOfLines={1}
              style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}
            >
              EUR {data?.price}
            </Text>
          </View>
          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {data?.title}
            </Text>
            {/* <Text style={{ fontSize: 12 }}>{data?.category}</Text> */}
            <Text style={{ fontSize: 12 }}>
              <Entypo name="location-pin" color={"grey"} />

              {data?.address}
            </Text>
          </View>
        </View>
        {
          //detail view
        }
        <View style={styles.detailview}>
          <View style={styles.detailcard}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Details</Text>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Condition</Text>
              <Text style={styles.cardelement}>{data?.condition}</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Category</Text>
              <Text style={styles.cardelement}>{data?.category}</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Brand</Text>
              <Text style={styles.cardelement}>{data?.brand}</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Model</Text>
              <Text style={styles.cardelement}>{data?.model}</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Fuel type</Text>
              <Text style={styles.cardelement}>{data?.fuelType}</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Kilometers</Text>
              <Text style={styles.cardelement}>{data?.kiloMeters}</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Axle Count</Text>
              <Text style={styles.cardelement}>{data?.condition}</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingLeft: width(5), paddingBottom: width(3) }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
          <Text style={{ fontSize: 12, paddingVertical: width(2) }}>
          {data?.condition}
          </Text>
        </View>
        <View style={styles.profileview}>
          <View style={styles.profilecard}>
            <View style={styles.profilecardin}>
              <Image source={Icons?.user} style={styles.profileimage} />
              <Text style={{ marginHorizontal: width(2) }}>{data?.condition}</Text>
            </View>
            <IconButton title={"See All Ads"} />
          </View>
        </View>
        <View style={styles.contact}>
          <IconButton
            title={"WhatsApp"}
            icon={
              <Ionicons size={width(4)} name="logo-whatsapp" color={"white"} />
            }
            containerStyle={{ backgroundColor: "#41C053" }}
          />
          <IconButton
            title={"Viber"}
            icon={<Fontisto size={width(4)} name="viber" color={"white"} />}
            containerStyle={{
              backgroundColor: "#7D3DAF",
              marginLeft: width(2),
            }}
          />
        </View>
        <View style={{ paddingLeft: width(4) }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: width(2),
            }}
          >
            Location
          </Text>
        </View>
        <View style={styles.map}>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
