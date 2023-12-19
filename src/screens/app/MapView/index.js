import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Card, Head, ScreenWrapper } from "../../../components";
import { selectUserMeta } from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RBSheet from "react-native-raw-bottom-sheet";
import { getAllData } from "../../../backend/api";
import { selectCategoryList } from "../../../redux/slices/config";
import { Apikey } from "../../../utills/Constants";
import { height, width } from "../../../utills/Dimension";

export default function MapAdView({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mapRef = useRef();
  const refRBSheet = useRef();
  const categories = useSelector(selectCategoryList);
  const userInfo = useSelector(selectUserMeta);
  const id = userInfo?._id;

  const [data, setData] = useState([]);
  //const [currentLocation, setCurrentLocation] = useState("");
  const [address, setAddresss] = useState("");
  const [selectData, setSelectData] = useState({});

  const queryParams = {
    address: address || "",
    page: 1,
  };
  useEffect(() => {
    getData();
  }, [address]);
  const getData = async () => {
    let d = await getAllData(queryParams);
    if (d) {
      setData(d?.ad);
    } else {
      setData([]);
    }
  };

  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };
  useEffect(() => {
    getLocation();
  }, []);
  // useEffect(() => {
  //   getData(id);
  // }, []);

  // const getData = useCallback(async (id) => {
  //   setLoader(true);
  //   let d = await getFavAds(id);
  //   if (d) setData(d);
  //   else setData([]);
  //   setLoader(false);
  // });
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    mapRef.current.animateToRegion(
      {
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      3 * 1000
    );
    // reverseGeocodeLocation(location.coords);
    getPlaceName(location.coords.latitude, location.coords.longitude);
  };
  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC9nSGumZ7_6Xs0pd6HBiU_paZT7mmH5UI`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const placeName = data.results[0].formatted_address;
        const parts = placeName.split(", "); // Split the address string by commas and create an array

        // Get the last part, which should be "Pakistan"
        const lastPart = parts[parts.length - 2];

        setAddresss(lastPart);
      }
    } catch (error) {
      console.error("Error getting place name:", error);
    }
  };

  return (
    <ScreenWrapper
    showStatusBar={false}
      headerUnScrollable={() => (
        <Head headtitle={"searchpage.title"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View
        style={{
          padding: width(3),
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ paddingVertical: width(1), flex: 1 }}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder={t("searchpage.search")}
            currentLocation={true}
            onPress={(data, details = null) => {
              // setAddress(details?.formatted_address);
              const placeName = details?.formatted_address;
              const parts = placeName.split(", "); // Split the address string by commas and create an array

              // Get the last part, which should be "Pakistan"
              const lastPart = parts[parts.length - 2];

              setAddresss(lastPart);
              mapRef.current.animateToRegion(
                {
                  latitude: details?.geometry?.location?.lat,
                  longitude: details?.geometry?.location?.lng,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                },
                3 * 1000
              );
            }}
            disableScroll={true}
            styles={{
              textInput: { backgroundColor: AppColors.greybackground },
            }}
            query={{
              key: Apikey,
              language: "en",
              components: "country:ch",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={300}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{ marginLeft: height(2), marginTop: height(1) }}
            onPress={getLocation}
          >
            <MaterialIcons
              name="my-location"
              size={width(7)}
              color={AppColors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainViewContainer}>
        <MapView
          clusterColor={AppColors.primary}
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: width(3),
          }}
          zoomControlEnabled={true}
        >
          {data.map((item, index) => {
            let imag = categories.find(
              (category) => category.name === item?.category
            )?.image;
            return (
              imag && (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item?.latitude || 0,
                    longitude: item?.longitude || 0,
                  }}
                  onPress={() => {
                    setSelectData(item);
                    setTimeout(() => {
                      refRBSheet.current.open();
                    }, 500);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      height: width(10),
                      width: width(10),
                      borderRadius: width(10),
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <MyIcon
                      height={width(7)}
                      width={width(7)}
                      tintColor={AppColors.primary}
                    /> */}
                    <Image
                      style={{ height: width(10), width: width(10) }}
                      source={{ uri: imag }}
                    />
                  </View>
                </Marker>
              )
            );
          })}
        </MapView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={height(55)}
        customStyles={styles.bs}
      >
        {/* <MapAdCard
          data={selectData}
          onPress={() => {
            refRBSheet.current.close();
          }}
        /> */}
        <Card
          data={selectData}
          onPresshide={() => {
            refRBSheet.current.close();
          }}
          map={true}
        />
      </RBSheet>
    </ScreenWrapper>
  );
}
