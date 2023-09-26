import { Ionicons, Entypo } from "@expo/vector-icons";
import RadioButtonRN from "radio-buttons-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckBox from "react-native-check-box";
import { SelectList } from "react-native-dropdown-select-list";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FilePickerModal,
  Head,
  Input,
  ScreenWrapper,
} from "../../../components";
import { selectUserMeta, setUserAds } from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { ApiManager } from "../../../backend/ApiManager";
import { Apikey, BaseUrl } from "../../../utills/Constants";
import axios from "axios";
import { setAppLoader } from "../../../redux/slices/config";
import {
  addPostAd,
  geVehicleData,
  geVehicleMakes,
  getCarData,
  getCarModel,
} from "../../../backend/api";
import { getOwneAd } from "../../../backend/auth";
import ScreenNames from "../../../routes/routes";
import {
  bodyShapeList,
  exteriorColorList,
  fuelTypelist,
  gearBoxList,
  interiorColorList,
} from "../../../utills/Data";
import { errorMessage, successMessage } from "../../../utills/Methods";

export default function AddPost({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const mapRef = useRef(null);

  const imageRef = useRef(null);
  const [image, setImage] = React.useState([]);
  // const [category, setCategory] = React.useState("");
  // const [subCategory, setSubCategory] = React.useState("");
  const category = route?.params?.category;
  const subCategory = route?.params?.subcategory || null;

  const [title, setTitle] = React.useState("");
  const [pricing, setPricing] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [year, setYear] = React.useState("");
  const [radius, setRadius] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [pricefrom, setPricefrom] = React.useState("");
  const [priceto, setPriceto] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [bodyshape, setBodyshap] = React.useState("");
  const [gearbox, setGearbox] = React.useState("");
  const [fueltype, setFueltype] = React.useState("");
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

  const [car, setcar] = React.useState([]);
  const [carModel, setCarModel] = React.useState([]);
  useEffect(() => {
    getcar();
  }, []);
  const getcar = async () => {
    let vehicledata = await geVehicleMakes(category);
    // const convertedData = cardata.map((item, index) => ({
    //   key: item._id,
    //   value: item.make,
    // }));
    // setcar(convertedData);
    // console.log('====================================');
    // console.log(vehicledata);
    // console.log('====================================');
  };
  useEffect(() => {
    if (brand) getmodel(brand);
  }, [brand]);
  const getmodel = async (brand) => {
    let cardata = await getCarModel(brand);
    const convertedData = cardata.map((item, index) => ({
      key: index,
      value: item,
    }));
    setCarModel(convertedData);
  };
  const addPost = async () => {
    dispatch(setAppLoader(true));
    try {
      const requiredFields = [
        title,
        category,
        condition,
        brand,
        year,
        model,
        description,
        latitude,
        longitude,
        address,
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => !field);

      if (isAnyFieldEmpty) {
        // Show an alert if any required field is empty
        Alert.alert("Missing Fields", "Please fill in all required fields.");
        return;
      }
      const formData = new FormData();
      formData.append("userId", userInfo?._id);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("minPrice", pricefrom);
      formData.append("maxPrice", priceto);
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
      console.log("response of Ad post", resp);
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
      label: "new",
    },
    {
      label: "used",
    },
    {
      label: "Recondition",
    },
  ];
  const pdata = [
    {
      label: "Price",
    },
    {
      label: "Price Rang",
    },
    {
      label: "Disable",
    },
  ];
  const cdata = [{ value: "Whatsapp" }, { value: "Viber" }];
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
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle="Add Post" navigation={navigation} />
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
                  onPress={()=>{
                    let temp
                    temp = image.filter(i => i !== item);
                    setImage(temp)
                  }}
                  style={{height:height(3)}}>
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
            Attach Image
          </Text>
          <Text style={{ fontSize: width(2.5), padding: width(1) }}>
            You can upload up to 5 images.
          </Text>
          <Text
            style={{
              fontSize: width(2.5),
              padding: width(1),
              width: width(60),
              textAlign: "center",
            }}
          >
            First picture is the title picture. Long press to drag and sort
            images.
          </Text>
        </View>
        {/* --------product infomartio---- */}
        <View>
          <Text
            style={[styles.title, { fontSize: width(5), margin: width(2) }]}
          >
            Product Information
          </Text>

          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Title</Text>
            <Input
              setvalue={setTitle}
              placeholder={"Title of Vahicel"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Priceing</Text>

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
              selectedBtn={(e) => setPricing(e.label)}
            />
          </View>
          {pricing == "Price Rang" && (
            <View
              style={{ paddingVertical: width(1), alignSelf: "flex-start" }}
            >
              <Text style={styles.title}>Price Rang (CHF)</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  value={pricefrom}
                  setvalue={setPricefrom}
                  placeholder={"From"}
                  containerStyle={styles.price}
                />
                <Input
                  value={priceto}
                  setvalue={setPriceto}
                  placeholder={"to"}
                  containerStyle={styles.price}
                />
              </View>
            </View>
          )}
          {pricing == "Price" && (
            <View
              style={{ paddingVertical: width(1), alignSelf: "flex-start" }}
            >
              <Text style={styles.title}>Price (CHF)</Text>

              <Input
                value={price}
                setvalue={setPrice}
                placeholder={"price"}
                containerStyle={[styles.price, { width: width(90) }]}
              />
            </View>
          )}
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Condition</Text>

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
              selectedBtn={(e) => setCondition(e.label)}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Category</Text>
            <SelectList
              setSelected={(val) => setBrand(val)}
              data={car}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Brand</Text>
            <SelectList
              setSelected={(val) => setBrand(val)}
              data={car}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          {brand && (
            <View>
              {carModel != null ? (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>Model</Text>
                  <SelectList
                    setSelected={(val) => setModel(val)}
                    data={carModel}
                    save="value"
                    boxStyles={styles.searchbox}
                    dropdownStyles={styles.dropdown}
                  />
                </View>
              ) : (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>Year</Text>
                  <Input
                    value={year}
                    setvalue={setYear}
                    containerStyle={[styles.price, { width: width(90) }]}
                    placeholder={"1999"}
                  />
                </View>
              )}
              <View style={{ paddingVertical: width(1) }}>
                <Text style={styles.title}>Year</Text>
                <Input
                  value={year}
                  setvalue={setYear}
                  containerStyle={[styles.price, { width: width(90) }]}
                  placeholder={"1999"}
                />
              </View>
              {/* <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Year</Text>
                <SelectList
                  setSelected={(val) => setYear(val)}
                  data={data}
                  save="value"
                  boxStyles={styles.searchbox}
                  dropdownStyles={styles.dropdown}
                />
              </View> */}
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Body Shape</Text>
                <SelectList
                  setSelected={(val) => setBodyshap(val)}
                  data={bodyShapeList}
                  save="value"
                  boxStyles={styles.searchbox}
                  dropdownStyles={styles.dropdown}
                />
              </View>
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Gear Box</Text>
                <SelectList
                  setSelected={(val) => setGearbox(val)}
                  data={gearBoxList}
                  save="value"
                  boxStyles={styles.searchbox}
                  dropdownStyles={styles.dropdown}
                />
              </View>
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Fuel Type</Text>
                <SelectList
                  setSelected={(val) => setFueltype(val)}
                  data={fuelTypelist}
                  save="value"
                  boxStyles={styles.searchbox}
                  dropdownStyles={styles.dropdown}
                />
              </View>
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Exterioe Color</Text>
                <SelectList
                  setSelected={(val) => setExterior(val)}
                  data={exteriorColorList}
                  save="value"
                  boxStyles={styles.searchbox}
                  dropdownStyles={styles.dropdown}
                />
              </View>
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Interior Color</Text>
                <SelectList
                  setSelected={(val) => setInterior(val)}
                  data={interiorColorList}
                  save="value"
                  boxStyles={styles.searchbox}
                  dropdownStyles={styles.dropdown}
                />
              </View>
            </View>
          )}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Video url</Text>
            <Input
              setvalue={setUrl}
              placeholder={"http://video.com"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Description</Text>
            <Input
              multi
              setvalue={setDescription}
              placeholder={"Description here.."}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
        </View>
        {/* --------owner infomartio---- */}
        <View>
          <Text
            style={[styles.title, { fontSize: width(5), margin: width(2) }]}
          >
            Contact Detail
          </Text>
          <View style={{ alignSelf: "center", marginBottom: height(3) }}>
            <Text style={styles.title}>How to be contact</Text>
            <SelectList
              setSelected={(val) => setHtc(val)}
              data={cdata}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Email</Text>
            <Input
              value={email}
              setvalue={setEmail}
              containerStyle={[styles.price, { width: width(90) }]}
              editable={false}
            />
          </View>

          {/* {htc == "Phone" && ( */}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>phone Number</Text>
            <Input
              value={phone}
              setvalue={setPhone}
              containerStyle={[styles.price, { width: width(90) }]}
              editable={false}
            />
          </View>
          {/* )} */}
          {htc == "Whatsapp" && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>Whastapp</Text>
              <Input
                setvalue={setWhatsapp}
                placeholder={"XXXXXXXXXX"}
                containerStyle={[styles.price, { width: width(90) }]}
              />
            </View>
          )}
          {htc == "Viber" && (
            <View style={{ paddingVertical: width(1) }}>
              <Text style={styles.title}>Viber</Text>
              <Input
                setvalue={setViber}
                placeholder={"XXXXXXXXXX"}
                containerStyle={[styles.price, { width: width(90) }]}
              />
            </View>
          )}
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Website</Text>
            <Input
              setvalue={setWebsite}
              placeholder={"www.abc.com"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
        </View>
        <View style={{ paddingVertical: width(1), flexDirection: "row" }}>
          <View style={{ paddingVertical: width(1), flex: 1 }}>
            <Text style={styles.title}>Location</Text>
            {/* <Input
              setvalue={setName}
              placeholder={"Johan"}
              containerStyle={[styles.price, { width: width(90) }]}
            /> */}
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder="Search"
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
                textInput: { backgroundColor: AppColors.grey },
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
            <Text>I have read and agree to the Eidcarosse</Text>
            <TouchableOpacity>
              <Text style={{ color: AppColors.primary, fontWeight: "bold" }}>
                {" "}
                Terms and Conditions
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
            title={"Post"}
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
            console.log(image.length);
            if (image.length< 5) {
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
