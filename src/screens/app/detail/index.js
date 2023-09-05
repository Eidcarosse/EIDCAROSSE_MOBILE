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
  // console.log("detail", data);
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
            data={[
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
              },
              {
                img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
              },
              {
                img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
              },
            ]}
            indicatorContainerStyle={{ color: AppColors.primery }}
            autoPlay={false}
            caroselImageStyle={{ resizeMode: "stretch" }}
            activeIndicatorStyle={{ backgroundColor: AppColors.primery }}
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
                color: AppColors.primery,
                fontWeight: "bold",
              }}
            >
              CHF {data?.chf}
            </Text>
            <Text
              numberOfLines={1}
              style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}
            >
              EUR {data?.eur}
            </Text>
          </View>
          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {data?.name}
            </Text>
            {/* <Text style={{ fontSize: 12 }}>{data?.category}</Text> */}
            <Text style={{ fontSize: 12 }}>
              <Entypo name="location-pin" color={"grey"} />

              {data?.location}
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
              <Text style={styles.cardelement}>used</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Category</Text>
              <Text style={styles.cardelement}>Minibus</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Brand</Text>
              <Text style={styles.cardelement}>Ford</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Model</Text>
              <Text style={styles.cardelement}>Transit</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Fuel type</Text>
              <Text style={styles.cardelement}>Diesel</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Kilometers</Text>
              <Text style={styles.cardelement}>362,000 km</Text>
            </View>
            <View style={styles.cardrow}>
              <Text style={styles.cardelement}>Axle Count</Text>
              <Text style={styles.cardelement}>2</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingLeft: width(5), paddingBottom: width(3) }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
          <Text style={{ fontSize: 12, paddingVertical: width(2) }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Text>
        </View>
        <View style={styles.profileview}>
          <View style={styles.profilecard}>
            <View style={styles.profilecardin}>
              <Image source={Icons?.user} style={styles.profileimage} />
              <Text style={{ marginHorizontal: width(2) }}>Name</Text>
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
