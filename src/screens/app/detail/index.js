import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image, Linking, Text, View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import { getDataofAdByID } from "../../../backend/api";
import {
  DetailFooter,
  DetailHeader,
  IconButton,
  ScreenWrapper,
} from "../../../components";
import { setAppLoader } from "../../../redux/slices/config";
import AppColors from "../../../utills/AppColors";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
export default function Detail({ navigation, route }) {
  const dat = route?.params;
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setDat] = useState([]);
  const img = data?.images?.map((item) => {
    return { img: item };
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch(setAppLoader(true));
    let d = await getDataofAdByID(dat?._id);
    if (d) {
      setDat(d);
      mapRef.current.animateToRegion(
        {
          latitude: d?.latitude,
          longitude: d?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        3 * 1000
      );
    } else setDat([]);
    dispatch(setAppLoader(false));
  };

  const openWhatsApp = () => {
    const phoneNumber = "0000000000"; // Replace with the recipient's phone number
    const message = "Hello,I saw your ad on Eidcarosse!"; // Replace with your desired message

    // Construct the WhatsApp URL
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp with the constructed URL
    Linking.openURL(whatsappURL)
      .then(() => {
        console.log("WhatsApp opened successfully");
      })
      .catch((error) => {
        console.error("Error opening WhatsApp:", error);
      });
  };

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
            caroselImageStyle={{ resizeMode: "contain" }}
            activeIndicatorStyle={{ backgroundColor: AppColors.primary }}
            closeIconColor="white"
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
            {data?.category != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Condition</Text>
                <Text style={styles.cardelement}>{data?.category}</Text>
              </View>
            )}
            {data?.subCategory != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>subCategory</Text>
                <Text style={styles.cardelement}>{data?.subCategory}</Text>
              </View>
            )}
            {data?.brand != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Brand</Text>
                <Text style={styles.cardelement}>{data?.brand}</Text>
              </View>
            )}
            {data?.model != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>model</Text>
                <Text style={styles.cardelement}>{data?.model}</Text>
              </View>
            )}
            {data?.year != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>year</Text>
                <Text style={styles.cardelement}>{data?.year}</Text>
              </View>
            )}
            {data?.condition != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Condition</Text>
                <Text style={styles.cardelement}>{data?.condition}</Text>
              </View>
            )}
            {data?.bodyShape != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Body Shape</Text>
                <Text style={styles.cardelement}>{data?.bodyShape}</Text>
              </View>
            )}
            {data?.engineCapacity != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Engine Capacity</Text>
                <Text style={styles.cardelement}>{data?.engineCapacity}</Text>
              </View>
            )}
            {data?.exteriorColor != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Exterior Color</Text>
                <Text style={styles.cardelement}>{data?.exteriorColor}</Text>
              </View>
            )}
            {data?.interiorColor != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>interiorColor</Text>
                <Text style={styles.cardelement}>{data?.interiorColor}</Text>
              </View>
            )}
            {data?.fuelType != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>fuelType</Text>
                <Text style={styles.cardelement}>{data?.fuelType}</Text>
              </View>
            )}
            {data?.gearBox != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>gearBox</Text>
                <Text style={styles.cardelement}>{data?.gearBox}</Text>
              </View>
            )}
            {data?.km != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>km</Text>
                <Text style={styles.cardelement}>{data?.km}</Text>
              </View>
            )}
            {data?.maxPrice != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>maxPrice</Text>
                <Text style={styles.cardelement}>{data?.maxPrice}</Text>
              </View>
            )}
            {data?.minPrice != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>minPrice</Text>
                <Text style={styles.cardelement}>{data?.minPrice}</Text>
              </View>
            )}
            {data?.price != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>price</Text>
                <Text style={styles.cardelement}>{data?.price}</Text>
              </View>
            )}
            {data?.videoUrl != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>videoUrl</Text>
                <Text style={styles.cardelement}>{data?.videoUrl}</Text>
              </View>
            )}
            {data?.website != "null" && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>website</Text>
                <Text style={styles.cardelement}>{data?.website}</Text>
              </View>
            )}
          </View>
        </View>
        {
          /////task uper/////
        }
        <View style={{ paddingLeft: width(5), paddingBottom: width(3) }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
          <Text style={{ fontSize: 12, paddingVertical: width(2) }}>
            {data?.description}
          </Text>
        </View>
        <View style={styles.profileview}>
          <View style={styles.profilecard}>
            <View style={styles.profilecardin}>
              <Image
                source={{ uri: data?.userId?.image }}
                style={styles.profileimage}
              />
              <Text style={{ marginHorizontal: width(2) }}>
                {data?.userId?.userName}
              </Text>
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
            onPress={openWhatsApp}
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
            ref={mapRef}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: width(3),
            }}
          >
            <Marker
              coordinate={{
                latitude: data?.latitude,
                longitude: data?.longitude,
              }}
            />
          </MapView>
        </View>
      </View>
    </ScreenWrapper>
  );
}
