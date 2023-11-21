import { Entypo, Fontisto, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import { adView, getDataofAdByID, toggleFavorite } from "../../../backend/api";
import {
  DetailFooter,
  DetailHeader,
  IconButton,
  RelatedAd,
  ScreenWrapper,
} from "../../../components";
import GlobalMethods, { infoMessage } from "../../../utills/Methods";
import { setAppLoader } from "../../../redux/slices/config";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import ScreenNames from "../../../routes/routes";
import {
  selectFavAds,
  selectUserMeta,
  setAdsFav,
} from "../../../redux/slices/user";
import { useTranslation } from "react-i18next";
import categories from "../../../svgcomponents";
import {
  BikeFuelType,
  Parts,
  bikeBodyShape,
  bikeExteriorColor,
  bikedata,
  bodyShapeList,
  exteriorColorList,
  fuelTypelist,
  gearBoxList,
  interiorColorList,
  kilometers,
  rdata,
} from "../../../utills/Data";
import { WebLink } from "../../../utills/Constants";
export default function Detail({ navigation, route }) {
  const { t } = useTranslation();
  const dat = route?.params;
  const loginuser = useSelector(selectUserMeta);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setDat] = useState([]);
  const favAdIds = useSelector(selectFavAds);
  const [fav, setFav] = useState(false);
  const [load, setload] = useState(false);
  useEffect(() => {
    if (isInArray(data?._id, favAdIds)) {
      setFav(true);
    } else {
      setFav(false);
    }
  });

  function isInArray(element, arr) {
    // Check if arr is defined and not null
    if (arr && Array.isArray(arr)) {
      return arr.includes(element);
    }
    return false; // Return false if arr is not defined or not an array
  }
  const onpressfav = async () => {
    if (!loginuser) {
      infoMessage("Login to ad Favotite", "Authentication");
    } else {
      let fav = await toggleFavorite(data?._id, loginuser?._id);
      if (isInArray(data._id, fav)) {
        setFav(true);
      } else {
        setFav(false);
      }
      dispatch(setAdsFav(fav));
    }
  };
  const img = data?.images?.map((item) => {
    return { img: item };
  });
  function isNullOrNullOrEmpty(value) {
    return (
      value === null ||
      value === "" ||
      value === "null" ||
      value === undefined ||
      value === "undefined"
    );
  }
  useEffect(() => {
    getData();
  }, [dat?._id != data?._id]);
  // useEffect(() => {
  //  if(isEnabled){

  //  }
  // }, [isEnd]);

  const getData = async () => {
    try {
      setload(true);
      let d = await getDataofAdByID(dat?._id);
      setload(false);
      if (d) {
        setDat(d);
        if (d.userId._id != loginuser?._id) {
          await adView(dat?._id);
        }
        if (mapRef?.current) {
          mapRef?.current.animateToRegion(
            {
              latitude: d?.latitude || 0,
              longitude: d?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            3 * 1000
          );
        }
      } else setDat({});
    } catch (error) {
      setload(false);
    }

    // dispatch(setAppLoader(false));
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <DetailHeader
          user={data?.userId}
          onPressBack={() => navigation.goBack()}
          onPressShare={() =>
            GlobalMethods.onPressShare(`${WebLink}${data?._id}`, data?.title)
          }
        />
      )}
      footerUnScrollable={() =>
        !(data?.userId?._id == loginuser?._id || load) && (
          <DetailFooter
            onPressCall={() => GlobalMethods.onPressCall(data?.phone)}
            onPressChat={() => {
              navigation.navigate(ScreenNames.CHAT, {
                userRoom: null,
                usr: data?.userId,
                userItem: data?._id,
              });
            }}
            onPressMail={() => GlobalMethods.onPressEmail(data?.email)}
          />
        )
      }
      statusBarColor={AppColors.primary} //{"rgba(128, 128, 128,5)"}
      barStyle="light-content"
      scrollEnabled
    >
      {load ? (
        <View
          style={{
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
            height: height(60),
          }}
        >
          <ActivityIndicator size={"large"} color={AppColors.primary} />
        </View>
      ) : (
        <View style={styles.mainViewContainer}>
          <View style={styles.imageview}>
            <ImageSlider
              showIndicator
              data={img}
              indicatorContainerStyle={{ color: AppColors.primary }}
              autoPlay={false}
              caroselImageStyle={{ resizeMode: "contain" }}
              activeIndicatorStyle={{ backgroundColor: AppColors.primary }}
              closeIconColor={AppColors.white}
              preview={true}
            />
          </View>
          <View style={styles.nameview}>
            <View
              style={{
                paddingBottom: height(2),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!isNullOrNullOrEmpty(data?.price) ? (
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
              ) : (
                <View style={styles.cfpview}>
                  <Text numberOfLines={1} style={styles.cfp}>
                    {t("detail.CFP")}
                  </Text>
                </View>
              )}
              {!(data?.userId?._id === loginuser?._id) ? (
                <TouchableOpacity
                  style={{ marginHorizontal: width(3) }}
                  onPress={onpressfav}
                >
                  <AntDesign
                    size={width(5)}
                    color={fav ? AppColors.primary : "black"}
                    name={fav ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
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
                {t("detail.detailword")}
              </Text>
              {!isNullOrNullOrEmpty(data?.category) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.category")}</Text>
                  <Text style={styles.cardelement2}>
                    {t(
                      categories.find(
                        (category) => category.title === data?.category
                      )?.show
                    )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.subCategory) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.subcategory")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {data?.category == "Bikes"
                      ? t(
                          bikedata.find(
                            (category) => category.title === data?.subCategory
                          )?.show
                        )
                      : data?.category == "Parts"
                      ? t(
                          Parts.find(
                            (category) => category.title === data?.subCategory
                          )?.show
                        )
                      : data?.subCategory}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.brand) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.brand")}</Text>
                  <Text style={styles.cardelement2}>{data?.brand}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.model) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.model")}</Text>
                  <Text style={styles.cardelement2}>{data?.model}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.year) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.year")}</Text>
                  <Text style={styles.cardelement2}>{data?.year}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.condition) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.condition")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.condition} */}
                    {t(
                      rdata?.find((con) => con?.key === data?.condition)?.label
                    )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.bodyShape) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.bodyshape")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.bodyShape} */}
                    {data?.category == "Bikes"
                      ? t(
                          bikeBodyShape.find(
                            (category) => category.value === data?.bodyShape
                          )?.key
                        )
                      : t(
                          bodyShapeList.find(
                            (category) => category.value === data?.bodyShape
                          )?.key
                        )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.engineCapacity) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.engin")}</Text>
                  <Text style={styles.cardelement2}>
                    {data?.engineCapacity}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.exteriorColor) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.exteriorcolor")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.exteriorColor} */}
                    {data?.category == "Bikes"
                      ? t(
                          bikeExteriorColor.find(
                            (category) =>
                              category?.value === data?.exteriorColor
                          )?.key
                        )
                      : t(
                          exteriorColorList.find(
                            (category) =>
                              category?.value === data?.exteriorColor
                          )?.key
                        )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.interiorColor) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>
                    {t("detail.interiorcolor")}
                  </Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.interiorColor} */}
                    {t(
                      interiorColorList.find(
                        (category) => category?.value === data?.interiorColor
                      )?.key
                    )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.fuelType) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.fueltype")}</Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.fuelType} */}
                    {data?.category == "Bikes"
                      ? t(
                          BikeFuelType.find(
                            (category) => category?.value === data?.fuelType
                          )?.key
                        )
                      : t(
                          fuelTypelist.find(
                            (category) => category?.value === data?.fuelType
                          )?.key
                        )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.gearBox) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.gearbox")}</Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.gearBox} */}
                    {t(
                      gearBoxList.find(
                        (category) => category.value === data?.gearBox
                      )?.key
                    )}
                  </Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.km) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.km")}</Text>
                  <Text style={styles.cardelement2}>
                    {/* {data?.gearBox} */}
                    {t(
                      kilometers.find((category) => category.value === data?.km)
                        ?.value
                    )}
                  </Text>
                </View>
              )}
              {/* {!isNullOrNullOrEmpty(data?.km) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.km")}</Text>
                  <Text style={styles.cardelement2}>{data?.km}</Text>
                </View>
              )} */}
              {/* {!isNullOrNullOrEmpty(data?.maxPrice) && (
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
              )} */}
              {!isNullOrNullOrEmpty(data?.price) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.price")}</Text>
                  <Text style={styles.cardelement2}>{data?.price}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.videoUrl) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.videourl")}</Text>
                  <Text style={styles.cardelement2}>{data?.videoUrl}</Text>
                </View>
              )}
              {!isNullOrNullOrEmpty(data?.website) && (
                <View style={styles.cardrow}>
                  <Text style={styles.cardelement}>{t("detail.website")}</Text>
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
              {t("detail.description")}
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
                {!data?.userId?.showAds && (
                  <IconButton
                    title={"detail.seeAllAds"}
                    onPress={() => {
                      navigation.navigate(ScreenNames.OTHERPROFILE, {
                        user: data?.userId,
                      });
                    }}
                  />
                )}
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
                      color={AppColors.white}
                    />
                  }
                  containerStyle={{ backgroundColor: "#41C053" }}
                  onPress={() => GlobalMethods.openWhatsApp(data?.whatsapp)}
                />
              )}
              {!isNullOrNullOrEmpty(data?.viber) && (
                <IconButton
                  title={"Viber"}
                  icon={
                    <Fontisto
                      size={width(4)}
                      name="viber"
                      color={AppColors.white}
                    />
                  }
                  containerStyle={{
                    backgroundColor: "#7D3DAF",
                    marginLeft: width(2),
                  }}
                  onPress={() => GlobalMethods.openViber(data?.viber)}
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
              {t("detail.location")}
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
          <RelatedAd category={data?.category} />
        </View>
      )}
    </ScreenWrapper>
  );
}
