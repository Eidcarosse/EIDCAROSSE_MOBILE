import { Entypo, Ionicons } from "@expo/vector-icons";
import RadioButtonRN from "radio-buttons-react-native";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostAd,
  geVehicleCategory,
  geVehicleMakes,
  getModel,
} from "../../../backend/api";
import { getOwneAd } from "../../../backend/auth";
import {
  Button,
  FilePickerModal,
  Head,
  Input,
  ScreenWrapper,
} from "../../../components";
import { setAppLoader } from "../../../redux/slices/config";
import { selectUserMeta, setUserAds } from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import { Apikey } from "../../../utills/Constants";
import {
  BikeFuelType,
  bikeBodyShape,
  bikeExteriorColor,
  bodyShapeList,
  exteriorColorList,
  fuelTypelist,
  gearBoxList,
  interiorColorList,
} from "../../../utills/Data";
import { height, width } from "../../../utills/Dimension";
import { errorMessage, successMessage } from "../../../utills/Methods";
import styles from "./styles";

export default function AddPost({ navigation, route }) {
  const { t } = useTranslation();
  const category = route?.params?.category;
  const find = route?.params?.find;
  const sub = route?.params?.subcategory;

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const mapRef = useRef(null);
  const modelRef = useRef();
  const imageRef = useRef(null);
  const [image, setImage] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState(sub);
  const [title, setTitle] = React.useState("");
  const [pricing, setPricing] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [km, setKm] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [year, setYear] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [bodyshape, setBodyshap] = React.useState("");
  const [gearbox, setGearbox] = React.useState("");
  const [fueltype, setFueltype] = React.useState("");
  const [engineCapacity, setEngineCapacity] = React.useState("");
  const [exterior, setExterior] = React.useState("");
  const [interior, setInterior] = React.useState("");
  const [latitude, setLatiitude] = React.useState(37.78825);
  const [longitude, setLongitude] = React.useState(-122.4324);
  const [email, setEmail] = React.useState(userInfo?.email);
  const [phone, setPhone] = React.useState(userInfo?.phoneNumber);
  const [whatsapp, setWhatsapp] = React.useState("");
  const [viber, setViber] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [htc, setHtc] = React.useState("");
  ///api data
  const [vcompanies, setVcompanies] = React.useState([]);
  const [vCategory, setVCategory] = React.useState();
  const [apimodel, setapiModel] = React.useState([]);

  useEffect(() => {
    getvehicleMake();
    if (sub == undefined) {
      getvehicleCategory();
    }
  }, []);
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
    if (sub == undefined) {
      let vehicledata = await geVehicleCategory(find);
      console.log(vehicledata);
      if (vehicledata) {
        setVCategory(vehicledata);
      }
    } else {
      setVCategory(false);
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
        category,
        condition,
        brand,
        description,
        latitude,
        longitude,
        address,
        image
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => !field);

      if (isAnyFieldEmpty) {
        dispatch(setAppLoader(false));
        // Show an alert if any required field is empty
        errorMessage("requierd feilds are empty");

        return;
      }
      const formData = new FormData();
      formData.append("userId", userInfo?._id);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
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
      formData.append("viber", viber);
      formData.append("website", website);
      formData.append("whatsapp", whatsapp);
      // Append each selected image to the form data
      image.forEach((img, index) => {
        formData.append("file", {
          name: `image${index}`,
          type: "image/jpeg", // Adjust the type if needed
          uri: img,
        });
      });

      // console.log(formData);

      const resp = await addPostAd(formData);
      // console.log("response of Ad post", resp);
      if (resp?.success) {
        successMessage("Ad successfuly posted");
      } else {
        errorMessage("Something went wrong");
      }
      dispatch(setAppLoader(false));
      navigation.navigate("title1");
      const userAd = await getOwneAd(userInfo?._id);
      dispatch(setUserAds(userAd));
    } catch (error) {
      console.error("Image upload error:", error);
      dispatch(setAppLoader(false));
    }
  };
  const rdata = [
    {
      key: "new",
      label: t("condition.new"),
    },
    {
      key: "used",
      label: t("condition.used"),
    },
    {
      key: "Recondition",
      label: t("condition.Recondition"),
    },
  ];
  const pdata = [
    {
      key: "Price",
      label: "Price",
    },
    {
      key: "Disable",
      label: "Disable",
    },
  ];
  const cdata = ["Whatsapp", "Viber"];
  // console.log(
  //   title,
  //   category,
  //   condition,
  //   brand,
  //   year,
  //   model,
  //   description,
  //   latitude,
  //   longitude,
  //   address
  // );
  const showYear = (x) => {
    return (
      x === "Autos" ||
      x === "Bikes" ||
      x === "Boats" ||
      x === "Drones" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  const showbodyShape = (x) => {
    return (
      x === "Autos" ||
      x === "Bikes" ||
      x === "Boats" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  const showGearBox = (x) => {
    return (
      x === "Autos" ||
      x === "Motorcycle" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  const showFuletype = (x) => {
    return (
      x === "Autos" ||
      x === "Motorcycle" ||
      x === "Boats" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  const showExteriorColor = (x) => {
    return (
      x === "Autos" ||
      x === "Bikes" ||
      x === "Boats" ||
      x === "Drones" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  const showInteriorColor = (x) => {
    return (
      x === "Autos" ||
      x === "Boats" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  const showKM = (x) => {
    return (
      x === "Autos" ||
      x === "Bikes" ||
      x === "Boats" ||
      x === "Construction Machine" ||
      x === "Trucks" ||
      x === "Vans" ||
      x === "Trailers" ||
      x === "Busses"
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"addPost.title"} navigation={navigation} />
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
              {image.length <= 5 && (
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
            <Text style={styles.title}>Title</Text>
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
              initial={1}
              boxStyle={{
                width: width(90),
                borderWidth: 0,
                paddingVertical: width(1),
              }}
              activeColor={AppColors.primary}
              selectedBtn={(e) => {
                e.label == "Disable" ? setPrice("") : "";
                setPricing(e.label);
              }}
            />
          </View>
          {pricing == "Price" && (
            <View
              style={{ paddingVertical: width(1), alignSelf: "flex-start" }}
            >
              <Text style={styles.title}>{t("addPost.price")}(CHF)</Text>

              <Input
                value={price}
                setvalue={setPrice}
                placeholder={t("addPost.phprice")}
                containerStyle={[styles.price, { width: width(90) }]}
              />
            </View>
          )}
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>{t("addPost.condition")}</Text>

            <RadioButtonRN
              data={rdata}
              initial={1}
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
          {!(vCategory == undefined || vCategory == []) ? (
            <View style={{ alignSelf: "center" }}>
              <Text style={styles.title}>{t("addPost.subcategory")}</Text>
              <SelectDropdown
                data={vCategory}
                searchPlaceHolder={t("addPost.phsearchHere")}
                search={true}
                buttonStyle={styles.searchbox}
                selectedRowStyle={{ backgroundColor: AppColors.primary }}
                selectedRowTextStyle={{ color: AppColors.white }}
                buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
                dropdownStyle={styles.dropdown}
                onSelect={(selectedItem, index) => {
                  setSubCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          ) : sub ? (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.category")}</Text>
              <Input
                value={subCategory}
                setvalue={setSubCategory}
                containerStyle={[styles.price]}
                editable={false}
              />
            </View>
          ) : (
            <></>
          )}
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>{t("addPost.brand")}</Text>
            <SelectDropdown
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
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          {brand && (
            <View>
              {apimodel ? (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.model")}</Text>
                  <SelectDropdown
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
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
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
                    value={year}
                    setvalue={setYear}
                    containerStyle={[styles.price, { width: width(90) }]}
                    placeholder={t("addPost.phyear")}
                  />
                </View>
              )}
              {showbodyShape(category) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.bodyshape")}</Text>
                  <SelectDropdown
                    data={category == "Bikes" ? bikeBodyShape : bodyShapeList}
                    search={true}
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
                      setBodyshap(selectedItem.value);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return t(selectedItem.key);
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return t(item.key);
                    }}
                  />
                </View>
              )}
              {showGearBox(find) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.gearbox")}</Text>
                  <SelectDropdown
                    data={gearBoxList}
                    search={true}
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
                      setGearbox(selectedItem.value);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return t(selectedItem.key);
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return t(item.key);
                    }}
                  />
                </View>
              )}
              {showFuletype(find) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.fueltype")}</Text>
                  <SelectDropdown
                    data={category == "Bikes" ? BikeFuelType : fuelTypelist}
                    search={true}
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
                      setFueltype(selectedItem.value);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return t(selectedItem.key);
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return t(item.key);
                    }}
                  />
                </View>
              )}
              {showExteriorColor(category) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.exteriorcolor")}</Text>
                  <SelectDropdown
                    data={
                      category == "Bikes"
                        ? bikeExteriorColor
                        : exteriorColorList
                    }
                    search={true}
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
                      setExterior(selectedItem.value);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return t(selectedItem.key);
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return t(item.key);
                    }}
                  />
                </View>
              )}
              {showInteriorColor(category) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.interiorcolor")}</Text>
                  <SelectDropdown
                    data={interiorColorList}
                    search={true}
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
                      setInterior(selectedItem.value);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return t(selectedItem.key);
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return t(item.key);
                    }}
                  />
                </View>
              )}
            </View>
          )}
          {showKM(category) && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.km")}</Text>
              <Input
                value={km}
                setvalue={setKm}
                placeholder={t("addPost.phkm")}
                containerStyle={[styles.price, { width: width(90) }]}
              />
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
          <Text
            style={[styles.title, { fontSize: width(5), margin: width(2) }]}
          >
            {t("addPost.contactdetail")}
          </Text>
          <View style={{ alignSelf: "center", marginBottom: height(3) }}>
            <Text style={styles.title}>{t("addPost.htc")}</Text>
            <SelectDropdown
              data={cdata}
              search={true}
              searchPlaceHolder={t("addPost.phsearchHere")}
              buttonStyle={styles.searchbox}
              selectedRowStyle={{ backgroundColor: AppColors.primary }}
              selectedRowTextStyle={{ color: AppColors.white }}
              buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
              dropdownStyle={styles.dropdown}
              onSelect={(selectedItem, index) => {
                setHtc(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          {htc == "Whatsapp" && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.whatsapp")}</Text>
              <Input
                value={whatsapp}
                setvalue={setWhatsapp}
                placeholder={t("addPost.phwhatsapp")}
                containerStyle={[styles.price, { width: width(90) }]}
              />
            </View>
          )}
          {htc == "Viber" && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>{t("addPost.viber")}</Text>
              <Input
                value={viber}
                setvalue={setViber}
                placeholder={t("addPost.phviber")}
                containerStyle={[styles.price, { width: width(90) }]}
              />
            </View>
          )}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>{t("addPost.email")}</Text>
            <Input
              value={email}
              setvalue={setEmail}
              containerStyle={[styles.price, { width: width(90) }]}
              editable={false}
            />
          </View>

          {/* {htc == "Phone" && ( */}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>{t("addPost.phoneNumber")}</Text>
            <Input
              value={phone}
              setvalue={setPhone}
              containerStyle={[styles.price, { width: width(90) }]}
              editable={false}
            />
          </View>
          {/* )} */}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>{t("addPost.website")}</Text>
            <Input
              value={website}
              setvalue={setWebsite}
              placeholder={t("addPost.phwebsite")}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
        </View>
        <View style={{ paddingVertical: width(1), flexDirection: "row" }}>
          <View style={{ paddingVertical: width(1), flex: 1 }}>
            <Text style={styles.title}>{t("addPost.location")}</Text>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder={t("addPost.phlocation")}
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
            padding: width(4),
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
            <TouchableOpacity>
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
            onPress={addPost}
            title={"addPost.post"}
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
            if (image.length < 5) {
              return Platform.OS === "android"
                ? imageUri.uri
                : imageUri.uri.replace("file://", "");
            }
          });
          setImage([...image, ...selectedImages]);
        }}
      />
    </ScreenWrapper>
  );
}
