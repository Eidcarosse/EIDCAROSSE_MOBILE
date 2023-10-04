import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Button,
  CardView,
  Head,
  Input,
  ListingView,
  ScreenWrapper,
  SearchBar,
} from "../../../components";
import AppColors from "../../../utills/AppColors";
//import { data } from "../../../utills/Data";
import RadioButtonRN from "radio-buttons-react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import {
  geVehicleCategory,
  geVehicleMakes,
  getAllData,
} from "../../../backend/api";
import { setAppLoader } from "../../../redux/slices/config";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import categories from "../../../svgcomponents";
import { Parts, bikedata } from "../../../utills/Data";

export default function ListData({ navigation, route }) {
  const cat = route?.params?.category;
  const find = route?.params?.find;
  const sub = route?.params?.subcategory;
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const modelRef = useRef();
  const [sortby, setSortby] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [pricefrom, setPricefrom] = React.useState();
  const [priceto, setPriceto] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [category, setCategory] = React.useState(cat);
  // const [gearbox, setGearbox] = React.useState("");
  // const [fueltype, setFueltype] = React.useState("");
  // const [exterior, setExterior] = React.useState("");
  // const [interior, setInterior] = React.useState("");

  const [loder, setLoder] = React.useState(false);
  const [vcompanies, setVcompanies] = React.useState([]);
  const [vCategory, setVCategory] = React.useState();
  const [apimodel, setapiModel] = React.useState([]);
  const [data, setData] = useState([]);
  const [columnumber, setcolumnumber] = useState(2);

  const queryParams = {
    address: "",
    category: category||'',
    subCategory: "",
    condition: "",
    title: "",
    brand: brand,
    minPrice: priceto,
    maxPrice: pricefrom,
    sortBy: sortby,
    page: 1, // Adjust the page number as needed
  };

  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   if (route?.params?.find) {
  //     dispatch(setCategoryFilter(route?.params?.find));
  //   } else {
  //     dispatch(setCategoryFilter(null));
  //   }
  // }, []);

  useEffect(() => {
    getvehicleMake();
    if (sub == undefined) {
      getvehicleSubCategory();
    }
  }, [category]);
  const getvehicleMake = async () => {
    setLoder(true);
    let vehicledata = await geVehicleMakes(find);

    if (vehicledata) {
      setLoder(false);
      setVcompanies(vehicledata);
    } else {
      setLoder(false);
      setVcompanies([]);
    }
    setLoder(false);
  };
  const getvehicleSubCategory = async () => {
    if (sub == undefined) {
      let vehicledata = await geVehicleCategory(category);
      console.log(vehicledata);
      if (vehicledata) {
        setVCategory(vehicledata);
      }
    } else {
      setVCategory(false);
    }
  };
  // useEffect(() => {
  //   if (brand) getmodel(find, brand);
  // }, [brand]);
  // const getmodel = async (a, b) => {
  //   dispatch(setAppLoader(true));
  //   let cardata = await getModel(a, b);

  //   if (cardata) {
  //     setapiModel(cardata);
  //     dispatch(setAppLoader(false));
  //   } else {
  //     setapiModel(false);
  //     dispatch(setAppLoader(false));
  //   }
  //   dispatch(setAppLoader(false));
  // };
  const getData = async () => {
    dispatch(setAppLoader(true));
    console.log('====================================');
    console.log(queryParams);
    console.log('====================================');
    let d = await getAllData(queryParams);
    console.log('====================================');
    console.log(d);
    console.log('====================================');
    if (d) setData(d);
    else setData([]);
    dispatch(setAppLoader(false));
  }

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

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Search Data"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.filterview}>
          <SearchBar containerstyle={{ width: width(80) }} />
          <TouchableOpacity
            style={{ marginLeft: width(2) }}
            onPress={() => refRBSheet.current.open()}
          >
            <FontAwesome
              name="sliders"
              size={width(7)}
              color={AppColors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.totalview}>
          <Text style={styles.totaltext}>
            Total Result : {data?.length || 0}
          </Text>
          <View style={styles.iconview}>
            <TouchableOpacity
              onPress={() => {
                setcolumnumber(2);
              }}
            >
              <Ionicons
                name="grid"
                size={width(4)}
                color={columnumber == 2 ? AppColors.primary : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setcolumnumber(1);
              }}
            >
              <FontAwesome5
                name="th-list"
                size={width(4)}
                color={columnumber == 1 ? AppColors.primary : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {columnumber == 2 ? (
          <FlatList
            key={"colum2"}
            data={data}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return <ListingView data={item} />;
            }}
            ListEmptyComponent={({ item }) => {
              return (
                <View style={styles.emptyview}>
                  <Image source={Icons.empty} style={styles.emptyimage} />
                </View>
              );
            }}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <FlatList
            key={"coloum1"}
            data={data}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return (
                <View style={{ width: width(98), alignItems: "center" }}>
                  <CardView data={item} />
                </View>
              );
            }}
            ListEmptyComponent={({ item }) => {
              return (
                <View style={styles.emptyview}>
                  <Image source={Icons.empty} style={styles.emptyimage} />
                </View>
              );
            }}
            numColumns={1}
            keyExtractor={(item, index) => index}
          />
        )}
        <View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnPressBack={true}
            height={height(75)}
            customStyles={styles.bs}
          >
            {loder ? (
              <ActivityIndicator color={AppColors.primary} size={"large"} />
            ) : (
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
                      data={categories.map((i) => i.title)}
                      searchPlaceHolder={"Search here"}
                      search={true}
                      defaultValue={category}
                      buttonStyle={styles.searchbox}
                      selectedRowStyle={{ backgroundColor: AppColors.primary }}
                      selectedRowTextStyle={{ color: AppColors.white }}
                      buttonTextStyle={{
                        textAlign: "left",
                        fontSize: width(3.5),
                      }}
                      dropdownStyle={styles.dropdown}
                      onSelect={(selectedItem, index) => {
                        setCategory(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View>
                  {!(vCategory == undefined || vCategory == []) ? (
                    <View style={{ alignSelf: "center" }}>
                      <Text style={styles.title}>sub Category</Text>
                      <SelectDropdown
                        data={vCategory}
                        searchPlaceHolder={"Search here"}
                        search={true}
                        buttonStyle={styles.searchbox}
                        selectedRowStyle={{
                          backgroundColor: AppColors.primary,
                        }}
                        selectedRowTextStyle={{ color: AppColors.white }}
                        buttonTextStyle={{
                          textAlign: "left",
                          fontSize: width(3.5),
                        }}
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
                    <View style={{ alignSelf: "center" }}>
                      <Text style={styles.title}>Sub Category</Text>
                      <SelectDropdown
                        data={
                          route?.params?.category == "Parts"
                            ? Parts.map((i) => i.title)
                            : bikedata.map((i) => i.title)
                        }
                        searchPlaceHolder={"Search here"}
                        search={true}
                        defaultValue={sub}
                        buttonStyle={styles.searchbox}
                        selectedRowStyle={{
                          backgroundColor: AppColors.primary,
                        }}
                        selectedRowTextStyle={{ color: AppColors.white }}
                        buttonTextStyle={{
                          textAlign: "left",
                          fontSize: width(3.5),
                        }}
                        dropdownStyle={styles.dropdown}
                        onSelect={(selectedItem, index) => {
                          setSubCategory(selectedItem);
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
                  <View style={{ alignSelf: "center" }}>
                    <Text style={styles.title}>Sort By</Text>
                    <SelectDropdown
                      data={sortdata}
                      searchPlaceHolder={"Search here"}
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
                        setSortby(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </View>
                  <View style={{ paddingVertical: width(1) }}>
                    <Text style={styles.title}>Title</Text>
                    <Input
                      value={title}
                      setvalue={setTitle}
                      placeholder={"Title of Vahicel"}
                      containerStyle={[
                        {
                          width: width(90),
                          backgroundColor: AppColors.greybackground,
                          borderBottomWidth: 0,
                          borderRadius: width(1),
                        },
                      ]}
                    />
                  </View>
                  <View style={{ paddingLeft: 4, paddingVertical: width(1) }}>
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
                  {category && (
                    <View style={{ alignSelf: "center" }}>
                      <Text style={styles.title}>Brand</Text>
                      <SelectDropdown
                        data={vcompanies}
                        search={true}
                        searchPlaceHolder={"Search here"}
                        buttonStyle={styles.searchbox}
                        selectedRowStyle={{
                          backgroundColor: AppColors.primary,
                        }}
                        selectedRowTextStyle={{ color: AppColors.white }}
                        buttonTextStyle={{
                          textAlign: "left",
                          fontSize: width(3.5),
                        }}
                        dropdownStyle={styles.dropdown}
                        onSelect={(selectedItem, index) => {
                          // if (model) modelRef.current.reset();
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
                  )}
                  {/* {apimodel.length != 0 && (
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
        )} */}
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
                      onPressClear={() => refRBSheet.current.close()}
                    />
                    <Button
                      title={"Filter"}
                      containerStyle={{
                        width: width(40),
                        borderRadius: width(2),
                        backgroundColor: AppColors.primary,
                      }}
                      onPressFilter={() => {
                        refRBSheet.current.close();
                        //getFilterData();
                      }}
                    />
                  </View>
                </ScrollView>
              </View>
            )}
          </RBSheet>
        </View>
      </View>
    </ScreenWrapper>
  );
}
