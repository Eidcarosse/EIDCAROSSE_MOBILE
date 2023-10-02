import RadioButtonRN from "radio-buttons-react-native";
import React, { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import AppColors from "../../utills/AppColors";
import { height, width } from "../../utills/Dimension";
import Input from "../InputText";
import Button from "../button";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { geVehicleCategory, geVehicleMakes, getModel } from "../../backend/api";
import { setAppLoader } from "../../redux/slices/config";
import { useDispatch,useSelector } from "react-redux";
import categories from "../../svgcomponents";

export default function SearchFilter({
  search,
  setSearch,
  onPressClear,
  onPressFilter,
  containerstyle,
}) {

  const dispatch=useDispatch();
  const modelRef = useRef();
  const [sortby, setSortby] = React.useState("");
  const [radius, setRadius] = React.useState("");
  const [pricefrom, setPricefrom] = React.useState("");
  const [priceto, setPriceto] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  // const [bodyshape, setBodyshap] = React.useState("");
  // const [gearbox, setGearbox] = React.useState("");
  // const [fueltype, setFueltype] = React.useState("");
  // const [exterior, setExterior] = React.useState("");
  // const [interior, setInterior] = React.useState("");
  const [vcompanies, setVcompanies] = React.useState([]);
  const [vCategory, setVCategory] = React.useState();
  const [apimodel, setapiModel] = React.useState([]);

  useEffect(() => {
    getvehicleMake();
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
  const sortdata = [
    "A to Z (title)",
    "Z to A (title)",
    "Price (low to high)",
    "Price (high to low)",
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
    <View style={styles.container}>
      <Text
        style={{
          fontSize: width(5),
          fontWeight: "bold",
          alignSelf: "center",
        }}
      >
        Filters
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Category</Text>
          <SelectDropdown
            data={categories.map((i)=>i.title)}
            searchPlaceHolder={"Search here"}
            search={true}
            buttonStyle={styles.searchbox}
            selectedRowStyle={{ backgroundColor: AppColors.primary }}
            selectedRowTextStyle={{ color: AppColors.white }}
            buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
            dropdownStyle={styles.dropdown}
            onSelect={(selectedItem, index) => {
              setSortby(selectedItem);
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
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Sort By</Text>
          <SelectDropdown
            data={sortdata}
            searchPlaceHolder={"Search here"}
            search={true}
            buttonStyle={styles.searchbox}
            selectedRowStyle={{ backgroundColor: AppColors.primary }}
            selectedRowTextStyle={{ color: AppColors.white }}
            buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
            dropdownStyle={styles.dropdown}
            onSelect={(selectedItem, index) => {
              setSortby(selectedItem);
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
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Radius Search</Text>
          <SelectList
            setSelected={(val) => setRadius(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        <View style={{ paddingLeft: 4, paddingVertical: width(1) }}>
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
            activeColor={AppColors.primary}
            selectedBtn={(e) => setCondition(e)}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Brand</Text>
          <SelectDropdown
            data={vcompanies}
            search={true}
            searchPlaceHolder={"Search here"}
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
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Model</Text>
          <SelectDropdown
            ref={modelRef}
            searchPlaceHolder={"Search here"}
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
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Brand</Text>
          <SelectList
            setSelected={(val) => setBrand(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Model</Text>
          <SelectList
            setSelected={(val) => setModel(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Body Shape</Text>
          <SelectList
            setSelected={(val) => setBodyshap(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Gear Box</Text>
          <SelectList
            setSelected={(val) => setGearbox(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Fuel Type</Text>
          <SelectList
            setSelected={(val) => setFueltype(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Exterioe Color</Text>
          <SelectList
            setSelected={(val) => setExterior(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        {/* <View style={{ alignSelf: "center" }}>
          <Text style={styles.title}>Interior Color</Text>
          <SelectList
            setSelected={(val) => setInterior(val)}
            data={data}
            save="value"
            boxStyles={styles.searchbox}
            dropdownStyles={styles.dropdown}
          />
        </View> */}
        <View
          style={{
            padding: width(3),
            flexDirection: "row",
            width: width(90),
            justifyContent: "space-around",
          }}
        >
          <Button
            title={"clear"}
            containerStyle={{
              width: width(40),
              borderRadius: width(2),
              backgroundColor: "grey",
            }}
            onPress={onPressClear}
          />
          <Button
            title={"Filter"}
            containerStyle={{
              width: width(40),
              borderRadius: width(2),
              backgroundColor: AppColors.primary,
            }}
            onPress={() => {
              setCondition(-1);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
