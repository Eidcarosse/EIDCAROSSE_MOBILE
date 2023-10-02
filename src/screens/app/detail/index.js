import { Entypo, Fontisto, Ionicons ,AntDesign} from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image, Linking, Pressable, Text, View,TouchableOpacity } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import { getDataofAdByID } from "../../../backend/api";
import {
  DetailFooter,
  DetailHeader,
  IconButton,
  ScreenWrapper,
} from "../../../components";
import GlobalMethods from "../../../utills/Methods";
import { setAppLoader } from "../../../redux/slices/config";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import ScreenNames from "../../../routes/routes";
import { selectUserMeta } from "../../../redux/slices/user";
export default function Detail({ navigation, route }) {
  const dat = route?.params;
  const loginuser = useSelector(selectUserMeta);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setDat] = useState([]);
  const [fav, setFav] = useState(false);
  const setMyFav = () => {
    if (!loginuser) {
      alert("Please login first");
    } else setFav(!fav);
  };
  const img = data?.images?.map((item) => {
    return { img: item };
  });
  function isNullOrNullOrEmpty(value) {
    return value === null || value === "" || value === "null"|| value === undefined || value === "undefined";
  }
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
          latitude: d?.latitude || 0,
          longitude: d?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        3 * 1000
      );
    } else setDat({});
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
        <DetailHeader
          onPressBack={() => navigation.goBack()}
          onPressShare={GlobalMethods.onPressShare}
          like={data?.userId?._id == loginuser?._id}
          loginuser={loginuser ? true : false}
        />
      )}
      footerUnScrollable={() => (
        <DetailFooter
          onPressCall={GlobalMethods.onPressCall}
          onPressChat={GlobalMethods.onPressMessage}
          onPressMail={GlobalMethods.onPressEmail}
        />
      )}
      statusBarColor={AppColors.primary} //{"rgba(128, 128, 128,5)"}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageview}>
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
          <View style={{ paddingBottom: height(2), flexDirection: "row",justifyContent:'space-between',alignItems:'center' }}>
            <View style={{}}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width(4),
                  color: AppColors.primary,
                  fontWeight: "bold",
                }}
              >
                CHF {data?.price}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: width(3),
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                EUR {data?.price}
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginHorizontal: width(3) }}
              onPress={() => {
                setMyFav();
              }}
            >
              <AntDesign
                size={width(5)}
                color={fav ? AppColors.primary : "black"}
                name={fav ? "heart" : "hearto"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: width(5) }}>
              {data?.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: width(80),
                paddingVertical: width(2),
                alignItems: "center",
              }}
            >
              <Entypo name="location-pin" color={"grey"} size={width(5)} />
              <Text style={{ fontSize: width(3) }}>{data?.address}</Text>
            </View>
          </View>
        </View>
        {
          //detail view
        }
        <View style={styles.detailview}>
          <View style={styles.detailcard}>
            <Text style={{ fontSize: width(5), fontWeight: "bold" }}>
              Details
            </Text>
            {!isNullOrNullOrEmpty(data?.category) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>category</Text>
                <Text style={styles.cardelement2}>{data?.category}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.subCategory) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>subCategory</Text>
                <Text style={styles.cardelement2}>{data?.subCategory}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.brand) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Brand</Text>
                <Text style={styles.cardelement2}>{data?.brand}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.model) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Model</Text>
                <Text style={styles.cardelement2}>{data?.model}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.year) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Year</Text>
                <Text style={styles.cardelement2}>{data?.year}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.condition) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Condition</Text>
                <Text style={styles.cardelement2}>{data?.condition}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.bodyShape) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Body Shape</Text>
                <Text style={styles.cardelement2}>{data?.bodyShape}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.engineCapacity) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Engine Capacity</Text>
                <Text style={styles.cardelement2}>{data?.engineCapacity}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.exteriorColor) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Exterior Color</Text>
                <Text style={styles.cardelement2}>{data?.exteriorColor}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.interiorColor) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Interior Color</Text>
                <Text style={styles.cardelement2}>{data?.interiorColor}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.fuelType) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Fuel Type</Text>
                <Text style={styles.cardelement2}>{data?.fuelType}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.gearBox) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Gear Box</Text>
                <Text style={styles.cardelement2}>{data?.gearBox}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.km) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Killo Meter</Text>
                <Text style={styles.cardelement2}>{data?.km}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.maxPrice) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Max Price</Text>
                <Text style={styles.cardelement2}>{data?.maxPrice}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.minPrice) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Min Price</Text>
                <Text style={styles.cardelement2}>{data?.minPrice}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.price) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Price</Text>
                <Text style={styles.cardelement2}>{data?.price}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.videoUrl) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Video Url</Text>
                <Text style={styles.cardelement2}>{data?.videoUrl}</Text>
              </View>
            )}
            {!isNullOrNullOrEmpty(data?.website) && (
              <View style={styles.cardrow}>
                <Text style={styles.cardelement}>Website</Text>
                <Text style={styles.cardelement2}>{data?.website}</Text>
              </View>
            )}
          </View>
        </View>
        {
          /////task uper/////
        }
        <View style={{ paddingLeft: width(5), paddingBottom: width(3) }}>
          <Text style={{ fontWeight: "bold", fontSize: width(5) }}>
            Description
          </Text>
          <Text style={{ fontSize: width(3), paddingVertical: width(2) }}>
            {data?.description}
          </Text>
        </View>
        {/* user profile */}
        {!(data?.userId?._id == loginuser?._id) && (
          <Pressable style={styles.profileview}>
            <View style={styles.profilecard}>
              <View style={styles.profilecardin}>
                <Image
                  source={{ uri: data?.userId?.image }}
                  style={styles.profileimage}
                />
                <Text
                  style={{
                    marginHorizontal: width(2),
                    fontSize: width(4),
                    fontWeight: "bold",
                    color: AppColors.black,
                  }}
                >
                  {data?.userId?.userName}
                </Text>
              </View>
              <IconButton
                title={"See All Ads"}
                onPress={() => {
                  navigation.navigate(ScreenNames.OTHERPROFILE, {
                    user: data?.userId,
                  });
                }}
              />
            </View>
          </Pressable>
        )}
        {!(data?.userId?._id == loginuser?._id) && (
          <View style={styles.contact}>
            {!isNullOrNullOrEmpty(data?.whatsapp) && (
              <IconButton
                title={"WhatsApp"}
                icon={
                  <Ionicons
                    size={width(4)}
                    name="logo-whatsapp"
                    color={"white"}
                  />
                }
                containerStyle={{ backgroundColor: "#41C053" }}
                onPress={openWhatsApp}
              />
            )}
            {!isNullOrNullOrEmpty(data?.viber) && (
              <IconButton
                title={"Viber"}
                icon={<Fontisto size={width(4)} name="viber" color={"white"} />}
                containerStyle={{
                  backgroundColor: "#7D3DAF",
                  marginLeft: width(2),
                }}
              />
            )}
          </View>
        )}
        <View style={{ paddingLeft: width(4) }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width(5),
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
                latitude: dat?.latitude || 0,
                longitude: dat?.longitude || 0,
              }}
            />
          </MapView>
        </View>
      </View>
    </ScreenWrapper>
  );
}
