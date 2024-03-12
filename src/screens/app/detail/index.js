import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import { adView, getDataofAdByID, toggleFavorite } from "../../../backend/api";
import { DetailFooter, DetailHeader, ScreenWrapper } from "../../../components";
import {
  selectFavAds,
  selectIsLoggedIn,
  selectUserMeta,
  setAdsFav,
} from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { WebLink } from "../../../utills/Constants";
import { height, width } from "../../../utills/Dimension";
import GlobalMethods, {
  checkPrice,
  formatPrice,
  formatPriceE,
  infoMessage,
  isNullOrNullOrEmpty,
  showDetails,
} from "../../../utills/Methods";
import styles from "./styles";
import { selectCurrentLanguage } from "../../../redux/slices/language";

function getLocale(languageCode) {
  const localeMap = {
    en: "en-US",
    de: "de-DE",
    es: "es-ES",
    it: "it-IT",
    fr: "fr-FR",
  };

  // Check if the language code exists in the map, otherwise return 'en-US' as default
  return localeMap[languageCode] || "de-DE";
}
function isInArray(element, arr) {
  // Check if arr is defined and not null
  if (arr && Array.isArray(arr)) {
    return arr.includes(element);
  }
  return false; // Return false if arr is not defined or not an array
}

export default function Detail({ navigation, route }) {
  const { t } = useTranslation();
  const dat = route?.params;
  const loginuser = useSelector(selectUserMeta);
  const islogin = useSelector(selectIsLoggedIn);
  const lang = useSelector(selectCurrentLanguage);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setDat] = useState({});
  const favAdIds = useSelector(selectFavAds);
  const [fav, setFav] = useState(false);
  const [loadfav, setloadFav] = useState(false);

  const [img, setimg] = useState([]);
  const [load, setload] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isInArray(data?._id, favAdIds)) {
      setFav(true);
    } else {
      setFav(false);
    }
  });

  const onpressfav = async () => {
    try {
      if (!loginuser) {
        infoMessage(t(`flashmsg.loginfavorite`), t(`flashmsg.authentication`));
      } else {
        setloadFav(true)
        let fav = await toggleFavorite(data?._id, loginuser?._id);
        if (isInArray(data._id, fav)) {
          setFav(true);
          setloadFav(false)
        } else {
          setFav(false);
          setloadFav(false)
        }
        dispatch(setAdsFav(fav));
      }
    } catch (error) {
      
    }
    finally{
      setloadFav(false)
    }
   
  };
  useEffect(() => {
    getData();
  }, [dat?._id != data?._id]);
  useEffect(() => {
    if (data && mapRef?.current) {
      mapRef?.current.animateToRegion(
        {
          latitude: data?.latitude || 0,
          longitude: data?.longitude || 0,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
        3 * 1000
      );
    }
  }, [data, mapRef?.current]);
  const getData = async () => {
    try {
      setload(true);
      let d = await getDataofAdByID(dat?._id);
      // setload(false);
      if (d) {
        setDat(d);
        setimg(d?.images);
        if (d.userId._id != loginuser?._id) {
          await adView(dat?._id);
        }
      } else {
        setDat({}), navigation.goBack();
      }
      setload(false);
    } catch (error) {
      setload(false);
    }

    // dispatch(setAppLoader(false));
  };
  const handlePress = () => {
    // You can replace the URL with the link you want to open
    Linking.openURL(data?.videoUrl);
  };
  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() => (
        <DetailHeader
          catgory={data?.category}
          subcatgory={data?.subCategory}
          onPressBack={() => navigation.goBack()}
          onPressShare={() =>
            GlobalMethods.onPressShare(
              `${WebLink}${data?._id}`,
              data?.title,
              data?.images[0]
            )
          }
        />
      )}
      footerUnScrollable={() =>
        !(data?.userId?._id == loginuser?._id || load) &&
        islogin && (
          <DetailFooter
            pNumber={data?.phone}
            eMail={data?.email}
            onPressCall={() =>
              GlobalMethods.onPressCall(data?.userId?.phoneNumber)
            }
            onPressChat={() => {
              navigation.navigate(ScreenNames.CHAT, {
                userRoom: null,
                usr: data?.userId,
                userItem: data,
              });
            }}
            onPressMail={() =>
              GlobalMethods.onPressEmail(
                data?.userId?.email,
                loginuser?.email,
                data?.title + `${WebLink}${data?._id}`
              )
            }
          />
        )
      }
      scrollEnabled
    >
      {/*------loder-------*/}
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
          {/*------Images-------*/}
          <View style={styles.imageview}>
            <Swiper
              style={{ height: height(30) }}
              activeDotColor={AppColors.primary}
              dotColor="white"
              automaticallyAdjustContentInsets={true}
            >
              {img?.map((image, index) => (
                <Pressable
                  key={index}
                  style={{
                    width: width(100),
                    height: height(32),
                    // backgroundColor: AppColor.lightGrey,
                  }}
                  onPress={() => {
                    setShowModal(true);
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={{
                      width: width(100),
                      height: height(32),
                      marginTop: height(1),
                      // alignSelf: "center",
                    }}
                    // style={{ flex: 1, resizeMode: "cover" }}
                  />
                </Pressable>
              ))}
            </Swiper>
          </View>
          {/*------price-------*/}
          <View style={styles.nameview}>
            {!isNullOrNullOrEmpty(data?.price) && (
              <View
                style={{
                  paddingBottom: height(2),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {checkPrice(data?.price) && data?.price ? (
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: height(2),
                        color: AppColors.primary,
                        fontWeight: "bold",
                      }}
                    >
                      CHF {formatPrice(data?.price)}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: height(1.5),
                        color: "grey",
                        fontWeight: "bold",
                      }}
                    >
                      EUR {formatPriceE(Math.round(data?.price * 1.06))}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.cfpview}>
                    <Text numberOfLines={1} style={styles.cfp}>
                      {t(`addPost.${data?.price}`)}
                    </Text>
                  </View>
                )}
                {/*------fav btn-------*/}
                {!(data?.userId?._id === loginuser?._id) ? (
                  loadfav ? (
                    <ActivityIndicator
                    style={{ marginHorizontal: width(3) }}
                    color={AppColors.primary} />
                  ) : (
                    <TouchableOpacity
                      style={{ marginHorizontal: width(3) }}
                      onPress={onpressfav}
                    >
                      <AntDesign
                        size={height(2.5)}
                        color={fav ? AppColors.primary : "black"}
                        name={fav ? "heart" : "hearto"}
                      />
                    </TouchableOpacity>
                  )
                ) : (
                  <></>
                )}
              </View>
            )}

            <View style={{ width: width(70) }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: height(2.5),
                  color: AppColors.black,
                }}
              >
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
                <Entypo name="location-pin" color={"grey"} size={height(2)} />
                <Text style={{ fontSize: height(1.5) }}>{data?.address}</Text>
              </View>
              <Text
                style={{
                  fontSize: height(1.5),
                  paddingHorizontal: height(1),
                  color: AppColors.black,
                }}
              >
                {new Date(data?.createdAt).toLocaleString(getLocale(lang), {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>
          {/*---------detail view------*/}
          {showDetails(data) && (
            <View style={styles.detailview}>
              <View style={styles.detailcard}>
                <Text
                  style={{
                    fontSize: height(2.5),
                    fontWeight: "bold",
                    paddingBottom: height(1),
                    color: AppColors.black,
                  }}
                >
                  {t("detail.detailword")}
                </Text>

                {/*--------Vehicle brand------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.brand) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>{t("addPost.brand")}</Text>
                    <Text style={styles.cardelement2}>
                      {data?.vhclZ?.brand === "Others"
                        ? t("category.Others")
                        : data?.vhclZ?.brand}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle model------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.model) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>{t("addPost.model")}</Text>
                    <Text style={styles.cardelement2}>
                      {data?.vhclZ?.model === "Others"
                        ? t("category.Others")
                        : data?.vhclZ?.model}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle type------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.type) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>{t("addPost.type")}</Text>
                    <Text style={styles.cardelement2}>
                      {t(`type.${data?.vhclZ?.type}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle year------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.year) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>{t("addPost.year")}</Text>
                    <Text style={styles.cardelement2}>{data?.vhclZ?.year}</Text>
                  </View>
                )}
                {/*--------Vehicle condition------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.condition) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.condition")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {/* {data?.condition} */}
                      {t(`condition.${data?.vhclZ?.condition}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle bodyshape------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.bodyShape) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.bodyshape")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(`bodyShapeList.${data?.vhclZ?.bodyShape}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle e-color------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.exteriorColor) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.exteriorcolor")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(`colorList.${data?.vhclZ?.exteriorColor}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle i-color------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.interiorColor) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.interiorcolor")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(`colorList.${data?.vhclZ?.interiorColor}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle fuel------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.fuelType) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.fueltype")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(`fuelTypelist.${data?.vhclZ?.fuelType}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle gareBox------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.gearBox) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.gearbox")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(`gearBoxList.${data?.vhclZ?.gearBox}`)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle Km------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.km) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>{t("detail.km")}</Text>
                    <Text style={styles.cardelement2}>
                      {t(data?.vhclZ?.km)}
                    </Text>
                  </View>
                )}
                {/*--------bznessInAg workingHours------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.workingHours) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.workingHours")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {data?.vhclZ?.workingHours}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle INSTALMENT Plan------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.dwnPymnt) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.downPayment")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(data?.vhclZ?.dwnPymnt)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle mnthlyInstl------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.mnthlyInstl) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.monthlyInstallments")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(data?.vhclZ?.mnthlyInstl)}
                    </Text>
                  </View>
                )}
                {/*--------Vehicle instlPlan------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.instlPlan) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.installmentPlan")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {t(data?.vhclZ?.instlPlan)}
                    </Text>
                  </View>
                )}
                {/*--------bznessInAg hrzDrvn------*/}
                {!isNullOrNullOrEmpty(data?.vhclZ?.hrzDrvn) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("addPost.drivenHours")}
                    </Text>
                    <Text style={styles.cardelement2}>
                      {data?.vhclZ?.hrzDrvn}
                    </Text>
                  </View>
                )}

                {/*--------Video URL------*/}
                {!isNullOrNullOrEmpty(data?.videoUrl) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("detail.videourl")}
                    </Text>
                    <TouchableOpacity
                      style={styles.cardelement2}
                      onPress={handlePress}
                    >
                      <Text numberOfLines={1} style={{ color: "blue" }}>
                        {data?.videoUrl}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/*--------Website------*/}
                {!isNullOrNullOrEmpty(data?.website) && (
                  <View style={styles.cardrow}>
                    <Text style={styles.cardelement}>
                      {t("detail.website")}
                    </Text>
                    <Text style={styles.cardelement2}>{data?.website}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          {/*---------description------*/}
          {!isNullOrNullOrEmpty(data?.description) && (
            <View style={{ paddingLeft: width(5), paddingVertical: width(3) }}>
              <Text style={{ fontWeight: "bold", fontSize: height(2.5) }}>
                {t("detail.description")}
              </Text>
              <Text
                selectable={true}
                style={{ fontSize: height(1.5), paddingVertical: width(2) }}
              >
                {data?.description}
              </Text>
            </View>
          )}
          {/* -------user profile-------- */}
          {!(data?.userId?._id == loginuser?._id) && (
            <Pressable
              onPress={() => {
                if (islogin) {
                  navigation.navigate(ScreenNames.OTHERPROFILE, {
                    user: data?.userId,
                  });
                } else {
                  infoMessage(
                    t(`flashmsg.loginView`),
                    t(`flashmsg.authentication`)
                  );
                }
              }}
              style={styles.profileview}
            >
              <View style={styles.profilecard}>
                <Image
                  source={{ uri: data?.userId?.image }}
                  style={styles.profileimage}
                  resizeMode="cover"
                />
                <View style={styles.profilecardin}>
                  <Text
                    style={{
                      marginHorizontal: width(2),
                      fontSize: height(2),
                      fontWeight: "bold",
                      width: width(50),
                      color: AppColors.black,
                    }}
                  >
                    {data?.userId?.firstName}
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: width(2),
                      fontSize: height(1.3),
                      color: AppColors.black,
                    }}
                  >
                    {t("detail.membrSince") + " "}
                    {new Date(data?.userId?.createdAt).toLocaleString(
                      getLocale(lang),
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </Text>
                </View>

                {/* <IconButton
                textStyle={{fontSize: width(2.5),}}
                  title={"detail.seeAllAds"}
                 
                /> */}
                <Entypo name="chevron-right" size={height(4)} />
              </View>
            </Pressable>
          )}
          {/*------whatsapp / viber-------*/}
          {!(data?.userId?._id == loginuser?._id) && islogin && (
            <View style={styles.contact}>
              {!isNullOrNullOrEmpty(data?.whatsapp) && (
                <TouchableOpacity
                  style={{ marginRight: height(2) }}
                  onPress={() => GlobalMethods.openWhatsApp(data?.whatsapp)}
                >
                  <Ionicons
                    size={height(5)}
                    name="logo-whatsapp"
                    color={"#41C053"}
                  />
                </TouchableOpacity>
              )}
              {!isNullOrNullOrEmpty(data?.viber) && islogin && (
                <TouchableOpacity
                  style={{ paddingTop: height(1) }}
                  onPress={() => {
                    let res = GlobalMethods.openViber(data?.viber);
                  }}
                >
                  <Fontisto size={height(4.5)} name="viber" color={"#59267c"} />
                </TouchableOpacity>
              )}
            </View>
          )}
          {/*------address-------*/}
          {!isNullOrNullOrEmpty(data?.address) && (
            <View style={{ paddingLeft: width(4) }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: height(2.5),
                  marginVertical: width(2),
                }}
              >
                {t("detail.location")}
              </Text>
            </View>
          )}
          {/*------Map view-------*/}
          {!isNullOrNullOrEmpty(data?.address) && (
            <View style={styles.map}>
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: data?.latitude || 0,
                  longitude: data?.longitude || 0,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: width(3),
                }}
              >
                <Marker
                  title="Ad owner location"
                  coordinate={{
                    latitude: data?.latitude || 0,
                    longitude: data?.longitude || 0,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  }}
                />
              </MapView>
            </View>
          )}
        </View>
      )}
      {/*------model of pictures-------*/}
      <Modal
        isVisible={showModal}
        statusBarTranslucent={true}
        style={{
          width: width(100),
          alignSelf: "center",
        }}
        hasBackdrop={true}
        backdropColor="black"
        backgroundColor={"black"}
        backdropOpacity={1}
        animationInTiming={300}
        animationOutTiming={200}
        animationIn={"lightSpeedIn"}
        animationOut={"lightSpeedOut"}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        onBackdropPress={() => {
          setShowModal(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
            style={{
              marginTop: width(10),
              alignSelf: "flex-end",
              backgroundColor: "rgba(0, 0, 0,.6)",
            }}
          >
            <Ionicons name="close" size={height(5)} color={AppColors.white} />
          </TouchableOpacity>
          <Swiper
            // showsButtons={true}
            // nextButton={
            //   <View
            //     style={{
            //       backgroundColor: "rgba(0, 0, 0,.2)",
            //       padding: width(1),
            //     }}
            //   >
            //     <AntDesign
            //       name="caretright"
            //       size={height(3)}
            //       color={AppColors.white}
            //     />
            //   </View>
            // }
            // prevButton={
            //   <View
            //     style={{
            //       backgroundColor: "rgba(0, 0, 0,.2)",
            //       padding: width(1),
            //     }}
            //   >
            //     <AntDesign
            //       name="caretleft"
            //       size={height(3)}
            //       color={AppColors.white}
            //     />
            //   </View>
            // }
            activeDotColor={AppColors.primary}
            dotColor="white"
            automaticallyAdjustContentInsets={true}
          >
            {img.map((image, index) => (
              <Pressable key={index} style={styles.modelView}>
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={styles.modelImage}
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
