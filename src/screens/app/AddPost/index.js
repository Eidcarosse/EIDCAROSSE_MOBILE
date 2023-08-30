import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import {
  Head,
  MyListingView,
  Button,
  Input,
  ScreenWrapper,
} from "../../../components";
import CardView from "../../../components/CardView";
import CategoryList from "../../../components/categorylist";
import Header from "../../../components/header";
import { selectUserMeta } from "../../../redux/slices/user";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";
import SearchBar from "../../../components/searchbar";
import { width } from "../../../utills/Dimension";
import ScreenNames from "../../../routes/routes";
import RadioButtonRN from "radio-buttons-react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function AddPost({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const [sortby, setSortby] = React.useState("");
  const [radius, setRadius] = React.useState("");
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
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Category</Text>
          <SelectList
            setSelected={(val) => setSortby(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>SubCatagory</Text>
          <SelectList
            setSelected={(val) => setRadius(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Sort by</Text>
          <SelectList
            setSelected={(val) => setSortby(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Radius Search</Text>
          <SelectList
            setSelected={(val) => setRadius(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View>
        <View style={{ paddingVertical: width(1), alignSelf: "flex-start" }}>
          <Text style={styles.title}>Price Rang (CHF)</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Condition</Text>

          <RadioButtonRN
            data={rdata}
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
    </ScreenWrapper>
  );
}
