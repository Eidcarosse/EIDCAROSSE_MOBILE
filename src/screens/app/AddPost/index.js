import Ionicons from "@expo/vector-icons/Ionicons";
import RadioButtonRN from "radio-buttons-react-native";
import React, { useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import { SelectList } from "react-native-dropdown-select-list";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FilePickerModal,
  Head,
  Input,
  ScreenWrapper,
} from "../../../components";
import { selectUserMeta } from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";

export default function AddPost({ navigation, route }) {
  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const userInfo = useSelector(selectUserMeta);
  const [image, setImage] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [pricing, setPricing] = React.useState();
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

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [viber, setViber] = React.useState("");
  const [website, setWebsite] = React.useState("");

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

  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle="Add Post" navigation={navigation} />
      )}
      statusBarColor={AppColors.primery}
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
                  backgroundColor: AppColors.primery,
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
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.primery,
                  borderRadius: width(2),
                  padding: width(3),
                }}
                onPress={() => imageRef.current.show()}
              >
                <Ionicons name="add" size={width(8)} color={AppColors.white} />
              </TouchableOpacity>
              {image.map((item, index) => (
                <Image
                  key={index}
                  style={{
                    height: width(15),
                    width: width(15),
                    borderRadius: width(3),
                    marginLeft: width(3),
                  }}
                  source={{ uri: item?.uri }}
                />
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
              activeColor={AppColors.primery}
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
                  setvalue={setPricefrom}
                  placeholder={"From"}
                  containerStyle={styles.price}
                />
                <Input
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
                setvalue={setPrice}
                placeholder={"From"}
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
              activeColor={AppColors.primery}
              selectedBtn={(e) => setCondition(e)}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Brand</Text>
            <SelectList
              setSelected={(val) => setBrand(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Year</Text>
            <SelectList
              setSelected={(val) => setYear(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
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
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Model</Text>
            <SelectList
              setSelected={(val) => setModel(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Body Shape</Text>
            <SelectList
              setSelected={(val) => setBodyshap(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Gear Box</Text>
            <SelectList
              setSelected={(val) => setGearbox(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Fuel Type</Text>
            <SelectList
              setSelected={(val) => setFueltype(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Exterioe Color</Text>
            <SelectList
              setSelected={(val) => setExterior(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.title}>Interior Color</Text>
            <SelectList
              setSelected={(val) => setInterior(val)}
              data={data}
              save="value"
              boxStyles={styles.searchbox}
              dropdownStyles={styles.dropdown}
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
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Name</Text>
            <Input
              setvalue={setName}
              placeholder={"Johan"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Email</Text>
            <Input
              setvalue={setEmail}
              placeholder={"abc@gmail.com"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>phone Number</Text>
            <Input
              setvalue={setPhone}
              placeholder={"XXXXXXXXXX"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Whastapp</Text>
            <Input
              setvalue={setWhatsapp}
              placeholder={"XXXXXXXXXX"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Viber</Text>
            <Input
              setvalue={setViber}
              placeholder={"XXXXXXXXXX"}
              containerStyle={[styles.price, { width: width(90) }]}
            />
          </View>
          <View style={{ paddingVertical: width(1) }}>
            <Text style={styles.title}>Website</Text>
            <Input
              setvalue={setWebsite}
              placeholder={"www.abc.com"}
              containerStyle={[styles.price, { width: width(90) }]}
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
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: width(3),
            }}
          />
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
            checkedCheckBoxColor={AppColors.primery}
            isChecked={check}
          />
          <View>
            <Text>I have read and agree to the Eidcarosse</Text>
            <TouchableOpacity>
              <Text style={{ color: AppColors.primery, fontWeight: "bold" }}>
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
            title={"Post"}
            containerStyle={{
              width: width(80),
              borderRadius: width(2),
              backgroundColor: AppColors.primery,
            }}
          />
        </View>
      </View>
      <FilePickerModal
        ref={imageRef}
        onFilesSelected={(img) => {
          console.log("imggggg", img);
          setImage(img);
        }}
      />
    </ScreenWrapper>
  );
}
