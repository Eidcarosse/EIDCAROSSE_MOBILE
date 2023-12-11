import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import RadioButtonRN from "radio-buttons-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostAd,
  backEndDataAPi,
  editAdApi,
  geVehicleCategory,
  geVehicleMakes,
  getModel,
} from "../../../backend/api";
import { getOwneAd } from "../../../backend/auth";
import {
  Button,
  FilePickerModal,
  Head,
  IconButton,
  Input,
  ScreenWrapper,
} from "../../../components";
import {
  selectShowViber,
  selectShowWhatsapp,
  setAppLoader,
  setShowViber,
  setShowWhatsapp,
} from "../../../redux/slices/config";
import { selectUserMeta, setUserAds } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { Apikey } from "../../../utills/Constants";
import { height, width } from "../../../utills/Dimension";
import {
  errorMessage,
  showBrand,
  showExteriorColor,
  showFuletype,
  showGearBox,
  showInteriorColor,
  showKM,
  showType,
  showYear,
  showbodyShape,
  successMessage,
} from "../../../utills/Methods";
import styles from "./styles";

export default function AddPost({ navigation, route }) {
  const { t } = useTranslation();
  const edit = route?.params?.data;
  const category = route?.params?.category || edit?.category;
  const find = route?.params?.find || edit?.category;
  const sub = route?.params?.subcategory || edit?.subCategory;
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const v = useSelector(selectShowViber);
  const w = useSelector(selectShowWhatsapp);
  const mapRef = useRef(null);
  const modelRef = useRef();
  const imageRef = useRef(null);
  const [image, setImage] = React.useState(edit?.images || []);
  const [subCategory, setSubCategory] = React.useState(sub);
  const [title, setTitle] = React.useState(edit?.title || "");
  const [pricing, setPricing] = React.useState(edit?.price ? "Price" : "");
  const [url, setUrl] = React.useState(edit?.videoUrl || "");
  const [km, setKm] = React.useState(edit?.km || "");
  const [description, setDescription] = React.useState(edit?.description || "");
  const [check, setCheck] = React.useState(false);
  const [year, setYear] = React.useState(edit?.year || "");
  const [price, setPrice] = React.useState(edit?.price || "");
  const [condition, setCondition] = React.useState(edit?.condition || "");
  const [brand, setBrand] = React.useState(edit?.brand || "");
  const [model, setModel] = React.useState(edit?.model || "");
  const [type, setType] = React.useState(edit?.type || "");
  const [bodyshape, setBodyshap] = React.useState(edit?.bodyShape || "");
  const [gearbox, setGearbox] = React.useState(edit?.gearBox || "");
  const [fueltype, setFueltype] = React.useState(edit?.fuelType || "");
  const [exterior, setExterior] = React.useState(edit?.exteriorColor || "");
  const [interior, setInterior] = React.useState(edit?.interiorColor || "");
  const [latitude, setLatiitude] = React.useState(edit?.latitude || 37.78825);
  const [longitude, setLongitude] = React.useState(
    edit?.longitude || -122.4324
  );
  const [email, setEmail] = React.useState(userInfo?.email);
  const [phone, setPhone] = React.useState(userInfo?.phoneNumber);
  const [whatsapp, setWhatsapp] = React.useState(
    edit?.whatsapp || userInfo?.whatsapp
  );
  const [viber, setViber] = React.useState(edit?.viber || userInfo?.viber);
  const [address, setAddress] = React.useState(edit?.address || "");

  const [vcompanies, setVcompanies] = React.useState([]);
  const [vtype, setVtype] = React.useState();
  const [apimodel, setapiModel] = React.useState([]);
  const [addPhone, setAddPhone] = useState(userInfo?.showNumber);

  const [addWhatsapp, setAddWhatsapp] = useState(w);
  const [addViber, setAddViber] = useState(v);
  const [feild, setFeild] = useState();
  useEffect(() => {
    setAddViber(edit?.viber ? true : false);
    setAddWhatsapp(edit?.whatsapp ? true : false);
  }, [edit]);
  useEffect(() => {
    getvehicleMake();
    if (showType(category)) {
      getvehicleCategory();
    }
    getFeilds();
  }, []);
  const getFeilds = async () => {
    let data = await backEndDataAPi({
      type: find,
    });
    setFeild(data);
  };
  const getvehicleMake = async () => {
    dispatch(setAppLoader(true));
    let vehicledata = await geVehicleMakes(find);

    if (vehicledata) {
      setVcompanies(vehicledata);
      dispatch(setAppLoader(false));
    } else {
      setVcompanies([]);
      dispatch(setAppLoader(false));
    }
    dispatch(setAppLoader(false));
  };
  const getvehicleCategory = async () => {
    let vehicledata = await geVehicleCategory(find);
    if (vehicledata) {
      setVtype(vehicledata);
    } else {
      setVtype(false);
    }
  };
  useEffect(() => {
    if (brand) getmodel(find, brand);
  }, [brand]);
  const getmodel = async (a, b) => {
    dispatch(setAppLoader(true));
    let cardata = await getModel(a, b);

    if (cardata) {
      setapiModel(cardata);
      dispatch(setAppLoader(false));
    } else {
      setapiModel(false);
      dispatch(setAppLoader(false));
    }
    dispatch(setAppLoader(false));
  };
  const addPost = async () => {
    dispatch(setAppLoader(true));
    try {
      const requiredFields = [
        title,
        condition,
        description,
        latitude,
        longitude,
        address,
        image,
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => !field);

      if (isAnyFieldEmpty) {
        dispatch(setAppLoader(false));
        // Show an alert if any required field is empty
        errorMessage(t(`flashmsg.emptyfield`), t(`flashmsg.require`));

        return;
      }
      const formData = new FormData();
      formData.append("userId", userInfo?._id);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("type", type);
      formData.append("price", price);
      formData.append("km", km);

      formData.append("condition", condition);
      formData.append("brand", brand);
      formData.append("year", year);
      formData.append("model", model);
      formData.append("bodyShape", bodyshape);
      formData.append("gearBox", gearbox);
      formData.append("fuelType", fueltype);
      formData.append("exteriorColor", exterior);
      formData.append("interiorColor", interior);
      formData.append("videoUrl", url);
      formData.append("description", description);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("address", address);
      addViber && formData.append("viber", viber);
      addWhatsapp && formData.append("whatsapp", whatsapp);
      addPhone && formData.append("phone", true);
      // Append each selected image to the form data
      image.forEach((img, index) => {
        formData.append("file", {
          name: `image${index}`,
          type: "image/jpeg", // Adjust the type if needed
          uri: img,
        });
      });
      const resp = await addPostAd(formData);
      if (resp?.success) {
        successMessage(t(`flashmsg.adPostsussessmsg`), t(`flashmsg.success`));
      } else {
        errorMessage(t(`flashmsg.adPosterrormsg`), t(`flashmsg.error`));
      }
      dispatch(setAppLoader(false));
      navigation.navigate("StackHome");
      const userAd = await getOwneAd(userInfo?._id);
      dispatch(setUserAds(userAd));
    } catch (error) {
      console.error("Image upload error:", error);
      dispatch(setAppLoader(false));
    }
  };
  const editPost = async () => {
    dispatch(setAppLoader(true));
    try {
      const requiredFields = [
        title,
        condition,
        latitude,
        longitude,
        address,
        image,
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => !field);

      if (isAnyFieldEmpty) {
        dispatch(setAppLoader(false));
        // Show an alert if any required field is empty
        errorMessage(t(`flashmsg.requiremsg`), t(`flashmsg.require`));

        return;
      }
      const formData = new FormData();
      formData.append("userId", userInfo?._id);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("type", type);
      formData.append("price", pricing == "Price" ? price : 0);
      formData.append("km", km);

      formData.append("condition", condition);
      formData.append("brand", brand);
      formData.append("year", year);
      formData.append("model", model);
      formData.append("bodyShape", bodyshape);
      formData.append("gearBox", gearbox);
      formData.append("fuelType", fueltype);
      formData.append("exteriorColor", exterior);
      formData.append("interiorColor", interior);
      formData.append("videoUrl", url);
      formData.append("description", description);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("address", address);
      formData.append("viber", addViber == true ? viber : "");
      formData.append("whatsapp", addWhatsapp == true ? whatsapp : "");
      addPhone && formData.append("phone", phone);
      image.forEach((img, index) => {
        formData.append("file", {
          name: `image${index}`,
          type: "image/jpeg", // Adjust the type if needed
          uri: img,
        });
      });
      const resp = await editAdApi(edit?._id, formData);
      if (resp?.success) {
        successMessage(t(`flashmsg.editadsussessmsg`), t(`flashmsg.success`));
        navigation.navigate(ScreenNames.MYADS);
      } else {
        errorMessage(t(`flashmsg.editerrormsg`), t(`flashmsg.error`));
      }
      dispatch(setAppLoader(false));
      // navigation.navigate("StackHome");
      // const userAd = await getOwneAd(userInfo?._id);
      // dispatch(setUserAds(userAd));
    } catch (error) {
      console.error("Image upload error:", error);
      dispatch(setAppLoader(false));
    }
  };
  const rdata = [
    {
      key: feild?.conditionList[0]?.value || "New",
      label: t("condition.new"),
    },
    {
      key: feild?.conditionList[1]?.value || "Used",
      label: t("condition.used"),
    },
    {
      key: feild?.conditionList[2]?.value || "Recondition",
      label: t("condition.Recondition"),
    },
  ];
  const pdata = [
    {
      key: "Price",
      label: t("condition.price"),
    },
    {
      key: "Disable",
      label: t("condition.disable"),
    },
  ];
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head
          headtitle={edit ? "Edit Ad" : "addPost.title"}
          navigation={navigation}
        />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View
          style={{
            backgroundColor: AppColors.grey,
            borderRadius: width(2),
            width: width(90),
            alignContent: "center",
            alignItems: "center",
            paddingVertical: height(3),
          }}
        >
          {!(image != null && image != "") ? (
            <View
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.primary,
                  borderRadius: width(2),
                  padding: width(3),
                }}
                onPress={() => imageRef.current.show()}
              >
                <Ionicons
                  name="camera"
                  size={width(15)}
                  color={AppColors.white}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: width(2) }}
            >
              {image.length < 7 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: AppColors.primary,
                    borderRadius: width(2),
                    padding: width(3),

                    alignSelf: "center",
                  }}
                  onPress={() => imageRef.current.show()}
                >
                  <Ionicons
                    name="add"
                    size={width(8)}
                    color={AppColors.white}
                  />
                </TouchableOpacity>
              )}
              {image.map((item, index) => (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    key={index}
                    style={{
                      height: width(15),
                      width: width(15),
                      borderRadius: width(3),
                      marginLeft: width(3),
                    }}
                    source={{ uri: item }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      let temp;
                      temp = image.filter((i) => i !== item);
                      setImage(temp);
                    }}
                    style={{ height: height(3) }}
                  >
                    <Entypo
                      name="squared-cross"
                      size={width(4)}
                      color={AppColors.primary}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width(4),
              padding: width(3),
            }}
          >
            {t("addPost.attachImage1")}
          </Text>
          <Text style={{ fontSize: width(2.5), padding: width(1) }}>
            {t("addPost.attachImage2")}
          </Text>
          <Text
            style={{
              fontSize: width(2.5),
              padding: width(1),
              width: width(60),
              textAlign: "center",
            }}
          >
            {t("addPost.attachImage3")}
          </Text>
        </View>
        {/* --------product infomartio---- */}
        <View>
          <Text
            style={[styles.title, { fontSize: width(5), margin: width(2) }]}
          >
            {t("addPost.productInformation")}
          </Text>

          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>{t("addPost.titleWord")}</Text>
            <Input
              value={title}
              setvalue={setTitle}
              placeholder={t("addPost.phtitleWord")}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>{t("addPost.pricing")}</Text>

            <RadioButtonRN
              data={pdata}
              circleSize={width(3)}
              initial={price ? 1 : 2}
              boxStyle={{
                width: width(90),
                borderWidth: 0,
                paddingVertical: width(1),
              }}
              activeColor={AppColors.primary}
              selectedBtn={(e) => {
                e.key == "Disable" ? setPrice("") : "";
                setPricing(e.key);
              }}
            />
          </View>
          {pricing == "Price" && (
            <View
              style={{ paddingVertical: width(1), alignSelf: "flex-start" }}
            >
              <Text style={styles.title}>{t("addPost.price")}(CHF)</Text>

              <Input
                value={price + ""}
                setvalue={setPrice}
                placeholder={t("addPost.phprice")}
                containerStyle={[styles.price, { width: width(90) }]}
                keyboardType="number-pad"
              />
            </View>
          )}
          {feild?.conditionList && (
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.title}>{t("addPost.condition")}</Text>

              <RadioButtonRN
                data={rdata}
                initial={
                  edit?.condition
                    ? rdata.findIndex(
                        (item) =>
                          item.key.toLowerCase() ===
                          (edit?.condition || "").toLowerCase()
                      ) + 1
                    : 0
                }
                circleSize={width(3)}
                boxStyle={{
                  width: width(90),
                  borderWidth: 0,
                  paddingVertical: width(1),
                }}
                activeColor={AppColors.primary}
                selectedBtn={(e) => {
                  setCondition(e.key);
                }}
              />
            </View>
          )}
          {!(vtype == undefined || vtype == []) && showType(category) && (
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.title}>{t("addPost.type")}</Text>

              <SelectDropdown
                defaultButtonText={
                  edit?.type || t("addPost.defaultValueDropdown")
                }
                data={vtype}
                searchPlaceHolder={t("addPost.phsearchHere")}
                search={true}
                buttonStyle={styles.searchbox}
                selectedRowStyle={{ backgroundColor: AppColors.primary }}
                selectedRowTextStyle={{ color: AppColors.white }}
                buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
                dropdownStyle={styles.dropdown}
                onSelect={(selectedItem, index) => {
                  setType(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          )}
          {!(
            sub == "undefined" ||
            sub == undefined ||
            sub == null ||
            sub == "null" ||
            sub == " " ||
            sub == ""
          ) && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.subcategory")}</Text>
              <Input
                value={t(`subList.${subCategory}`)}
                setvalue={setSubCategory}
                containerStyle={[styles.price]}
                editable={false}
              />
            </View>
          )}
          {showBrand(category) && (
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.title}>{t("addPost.brand")}</Text>
              <SelectDropdown
                defaultButtonText={brand || t("addPost.defaultValueDropdown")}
                data={vcompanies}
                search={true}
                searchPlaceHolder={t("addPost.phsearchHere")}
                buttonStyle={styles.searchbox}
                selectedRowStyle={{ backgroundColor: AppColors.primary }}
                selectedRowTextStyle={{ color: AppColors.white }}
                buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
                dropdownStyle={styles.dropdown}
                onSelect={(selectedItem, index) => {
                  if (model) modelRef.current.reset();
                  setBrand(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          )}
          {brand && (
            <View>
              {apimodel ? (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.model")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      model || t("addPost.defaultValueDropdown")
                    }
                    ref={modelRef}
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    data={apimodel}
                    search={true}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setModel(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
              ) : (
                <></>
              )}
              {showYear(category) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.year")}</Text>
                  <Input
                    value={year + ""}
                    setvalue={setYear}
                    containerStyle={[styles.price, { width: width(90) }]}
                    placeholder={t("addPost.phyear")}
                    keyboardType="number-pad"
                  />
                </View>
              )}
              {showbodyShape(find) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.bodyshape")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      bodyshape || t("addPost.defaultValueDropdown")
                    }
                    data={
                      category == "Bikes"
                        ? feild?.bikeBodyShape
                        : feild?.AutosBodyShape
                    }
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setBodyshap(selectedItem.name);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(`bodyShapeList.${selectedItem.name}`);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(`bodyShapeList.${item.name}`);
                    }}
                  />
                </View>
              )}
              {showGearBox(find) && feild?.gearBox && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.gearbox")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      gearbox || t("addPost.defaultValueDropdown")
                    }
                    data={feild.gearBox}
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setGearbox(selectedItem.name);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(`gearBoxList.${selectedItem.name}`);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(`gearBoxList.${item.name}`);
                    }}
                  />
                </View>
              )}
              {showFuletype(find) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.fueltype")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      fueltype || t("addPost.defaultValueDropdown")
                    }
                    data={
                      category == "Bikes"
                        ? feild?.BikeFuelType
                        : feild?.fuelType
                    }
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setFueltype(selectedItem.name);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(`fuelTypelist.${selectedItem.name}`);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(`fuelTypelist.${item.name}`);
                    }}
                  />
                </View>
              )}
              {showExteriorColor(category) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.exteriorcolor")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      exterior || t("addPost.defaultValueDropdown")
                    }
                    data={
                      category == "Bikes"
                        ? feild?.bikeColor
                        : feild?.exteriorColor
                    }
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setExterior(selectedItem.name);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(`colorList.${selectedItem.name}`);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(`colorList.${item.name}`);
                    }}
                  />
                </View>
              )}
              {showInteriorColor(category) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.interiorcolor")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      interior || t("addPost.defaultValueDropdown")
                    }
                    data={feild?.interiorColor}
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setInterior(selectedItem.name);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(`colorList.${selectedItem.name}`);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(`colorList.${item.name}`);
                    }}
                  />
                </View>
              )}
              {showKM(category) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.km")}</Text>
                  <SelectDropdown
                    data={feild?.kilometers}
                    defaultButtonText={km || t("addPost.defaultValueDropdown")}
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: width(3.5),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setKm(selectedItem.name);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(selectedItem.name);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(item.name);
                    }}
                  />
                </View>
              )}
            </View>
          )}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>{t("addPost.description")}</Text>
            <Input
              value={description}
              multi
              setvalue={setDescription}
              placeholder={t("addPost.phdescription")}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
        </View>
        <View style={{ paddingVertical: width(1) }}>
          <Text style={styles.title}>{t("addPost.videourl")}</Text>
          <Input
            value={url}
            setvalue={setUrl}
            placeholder={t("addPost.phurl")}
            containerStyle={[styles.price, { width: width(90) }]}
          />
        </View>
        {/* --------owner infomartio---- */}
        <View>
          <Text style={[styles.title, { fontSize: width(5) }]}>
            {t("addPost.contactdetail")}
          </Text>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>{t("addPost.email")}</Text>
            <Input
              value={email}
              setvalue={setEmail}
              containerStyle={[styles.price, { width: width(90) }]}
              editable={false}
            />
          </View>
          <IconButton
            onPress={() => {
              setAddPhone(!addPhone);
            }}
            title={"addPost.addNumber"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            iconright={
              <AntDesign
                name={!addPhone ? "checkcircleo" : "checkcircle"}
                color={!addPhone ? "black" : AppColors.primary}
                size={width(6)}
              />
            }
          />
          {/* {htc == "Phone" && ( */}
          {addPhone && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.phoneNumber")}</Text>
              <Input
                value={phone}
                setvalue={setPhone}
                containerStyle={[styles.price, { width: width(90) }]}
                editable={false}
              />
            </View>
          )}
          <IconButton
            onPress={() => {
              setAddWhatsapp(!addWhatsapp);
            }}
            title={"addPost.addWhatsapp"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            iconright={
              <AntDesign
                name={!addWhatsapp ? "checkcircleo" : "checkcircle"}
                color={!addWhatsapp ? "black" : AppColors.primary}
                size={width(6)}
              />
            }
          />
          {addWhatsapp && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.whatsapp")}</Text>
              <Input
                value={whatsapp}
                setvalue={setWhatsapp}
                placeholder={t("addPost.phwhatsapp")}
                containerStyle={[styles.price, { width: width(90) }]}
                keyboardType="phone-pad"
              />
            </View>
          )}
          <IconButton
            onPress={() => {
              setAddViber(!addViber);
            }}
            title={"addPost.addViber"}
            containerStyle={styles.container}
            textStyle={styles.texticon}
            iconright={
              <AntDesign
                name={!addViber ? "checkcircleo" : "checkcircle"}
                color={!addViber ? "black" : AppColors.primary}
                size={width(6)}
              />
            }
          />
          {addViber && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.viber")}</Text>
              <Input
                value={viber}
                setvalue={setViber}
                placeholder={t("addPost.phviber")}
                containerStyle={[styles.price, { width: width(90) }]}
                keyboardType="phone-pad"
              />
            </View>
          )}
        </View>
        <View style={{ paddingVertical: width(1), flexDirection: "row" }}>
          <View style={{ paddingVertical: width(1), flex: 1 }}>
            <Text style={styles.title}>{t("addPost.location")}</Text>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              autoFillOnNotFound={true}
              placeholder={edit?.address || t("addPost.phlocation")}
              currentLocation={true}
              onPress={(data, details = null) => {
                setAddress(details?.formatted_address);
                setLatiitude(details?.geometry?.location?.lat);
                setLongitude(details?.geometry?.location?.lng);
                mapRef.current.animateToRegion(
                  {
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
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
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: height(20),
            width: width(90),
            alignSelf: "center",
            borderRadius: width(3),
          }}
        >
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
                latitude: latitude,
                longitude: longitude,
              }}
            />
          </MapView>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: width(4),
            alignSelf: "flex-start",
          }}
        >
          <CheckBox
            style={{ paddingRight: width(2) }}
            onClick={() => {
              setCheck(!check);
            }}
            checkedCheckBoxColor={AppColors.primary}
            isChecked={check}
          />
          <View>
            <Text>{t("addPost.TandC1")}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNames.TNC);
              }}
            >
              <Text style={{ color: AppColors.primary, fontWeight: "bold" }}>
                {" "}
                {t("addPost.TandC2")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* --------button infomartio---- */}
        <View
          style={{
            padding: width(3),
            width: width(90),
          }}
        >
          <Button
            disabled={!check}
            onPress={() => {
              edit ? editPost() : addPost();
            }}
            title={edit ? "Edit" : "addPost.post"}
            containerStyle={{
              width: width(80),
              borderRadius: width(2),
              backgroundColor: !check ? "grey" : AppColors.primary,
            }}
          />
        </View>
      </View>
      <FilePickerModal
        ref={imageRef}
        multi={true}
        onFilesSelected={(img) => {
          const selectedImages = img.map((imageUri) => {
            return Platform.OS === "android"
              ? imageUri.uri
              : imageUri.uri.replace("file://", "");
          });
          const combinedImages = [...image, ...selectedImages];

          // If the total number of images exceeds 7, slice the array to keep only the first 7
          const limitedImages = combinedImages.slice(0, 7);

          // Update the state with the limited images
          setImage(limitedImages);
        }}
      />
    </ScreenWrapper>
  );
}
