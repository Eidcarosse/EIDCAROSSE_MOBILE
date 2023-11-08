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
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { setAppLoader } from "../../../redux/slices/config";

export default function ListData({ navigation, route }) {
  const cat = route?.params?.category;
  const find = route?.params?.find;
  const sub = route?.params?.subcategory;
  const t = route?.params?.search;
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [findValue, setFindValue] = useState(find);
  const modelRef = useRef();
  const [sortby, setSortby] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [subCategory, setSubCategory] = React.useState(sub);
  const [title, setTitle] = React.useState(t || "");
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pricefrom, setPricefrom] = React.useState();
  const [priceto, setPriceto] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [category, setCategory] = React.useState(cat);
  const [searchString, setSearchString] = useState("");

  const [refreshing, onRefresh] = React.useState(false);
  const [empty, setempty] = React.useState(false);

  // const [gearbox, setGearbox] = React.useState("");
  // const [fueltype, setFueltype] = React.useState("");
  // const [exterior, setExterior] = React.useState("");
  // const [interior, setInterior] = React.useState("");

  const [loder, setLoder] = React.useState(false);
  const [vcompanies, setVcompanies] = React.useState([]);
  const [vCategory, setVCategory] = React.useState();
  const [filter, setFilter] = React.useState(false);
  const [data, setData] = useState([]);
  const [columnumber, setcolumnumber] = useState(2);

  const queryParams = {
    address: address || "",
    category: category || "",
    subCategory: subCategory || "",
    condition: condition || "",
    title: title || "",
    brand: brand || "",
    minPrice: priceto,
    maxPrice: pricefrom,
    sortBy: sortby || "",
    page: pageNumber, // Adjust the page number as needed
  };

  useEffect(() => {
    dispatch(setAppLoader(true));
    getData();
    dispatch(setAppLoader(false));
  }, []);

  useEffect(() => {
    if (filter) getData();
  }, [filter]);
  const handleEndReached = () => {
    getData();
  };
  // useEffect(() => {
  //   if (category != "Bike") {
  //     setFindValue(category);
  //   } else {
  //     setFindValue(subCategory);
  //   }
  // });
  // useEffect(() => {
  //   if (route?.params?.find) {
  //     dispatch(setCategoryFilter(route?.params?.find));
  //   } else {
  //     dispatch(setCategoryFilter(null));
  //   }
  // }, []);
  //console.log("find value fo :", findValue, find);
  useEffect(() => {
    getvehicleMake();
    if (subCategory == undefined) {
      getvehicleSubCategory();
    }
  }, [category]);
  const getvehicleMake = async () => {
    setLoder(true);
    let vehicledata = await geVehicleMakes(findValue);
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
      let vehicledata = await geVehicleCategory(findValue);
      if (vehicledata) {
        setVCategory(vehicledata);
      }
    } else {
      setVCategory([]);
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
    onRefresh(true);
    let d = await getAllData(queryParams);
    if (d.length == 0) {
      setempty(true);
    }
    if (d) {
      setData((prevData) => [...prevData, ...d]);
      setPageNumber(pageNumber + 1);
    } else {
      setData([]);
    }
    onRefresh(false);
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
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Search Data"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
    >
      <View style={styles.mainViewContainer}>
        <SearchBar
          search={title}
          setSearch={setTitle}
          containerstyle={styles.search}
          onPress={() => {
            setData([]);
            setempty(false);
            if (pageNumber != 0) {
              setPageNumber(1);
            }
            setFilter(filter + 1);
          }}
        />
        <View style={styles.totalview}>
          <Text style={styles.totaltext}>
            Total Result :{" "}
            {data.filter((item) => {
              return item.title
                .toLowerCase()
                .includes(searchString.toLowerCase());
            }).length || 0}
          </Text>
          <View style={styles.iconview}>
            <TouchableOpacity
              style={{ paddingHorizontal: width(3) }}
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
              style={{ paddingHorizontal: width(3) }}
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
            <TouchableOpacity
              style={{ marginLeft: height(2) }}
              onPress={() => refRBSheet.current.open()}
            >
              <FontAwesome
                name="sliders"
                size={width(7)}
                color={AppColors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {columnumber == 2 ? (
          <FlatList
            key={"colum2"}
            data={data.filter((item) => {
              return item.title
                .toLowerCase()
                .includes(searchString.toLowerCase());
            })}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return <ListingView data={item} />;
            }}
            ListEmptyComponent={({ item }) => (
              <View style={styles.emptyview}>
                {refreshing ? (
                  <ActivityIndicator size={"large"} color={AppColors.primary} />
                ) : (
                  <Image source={Icons.empty} style={styles.emptyimage} />
                )}
              </View>
            )}
            onEndReached={() => {
              if (!empty) handleEndReached();
            }} // Callback when the end is reached
            onEndReachedThreshold={0.1}
            numColumns={2}
            ListFooterComponent={() =>
              !loder && !empty ? (
                <ActivityIndicator size={"large"} color={AppColors.primary} />
              ) : (
                <></>
              )
            }
            keyExtractor={(item, index) => index}
          />
        ) : (
          <FlatList
            key={"coloum1"}
            data={data.filter((item) => {
              return item.title
                .toLowerCase()
                .includes(searchString.toLowerCase());
            })}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return (
                <View style={{ width: width(98), alignItems: "center" }}>
                  <CardView data={item} />
                </View>
              );
            }}
            ListEmptyComponent={({ item }) => (
              <View style={styles.emptyview}>
                {refreshing ? (
                  <ActivityIndicator size={"large"} color={AppColors.primary} />
                ) : (
                  <Image source={Icons.empty} style={styles.emptyimage} />
                )}
              </View>
            )}
            numColumns={1}
            onEndReached={() => {
              if (!empty) handleEndReached();
            }} // Callback when the end is reached
            onEndReachedThreshold={0.1}
            ListFooterComponent={() =>
              !loder && !empty ? (
                <ActivityIndicator size={"large"} color={AppColors.primary} />
              ) : (
                <></>
              )
            }
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
            {refreshing ? (
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
                  {/* <View style={{ alignSelf: "center" }}>
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
                  </View> */}
                  {!(vCategory == undefined || vCategory == []) ? (
                    <View style={{ alignSelf: "center" }}>
                      <Text style={styles.title}>Sub Category</Text>
                      <SelectDropdown
                        data={vCategory}
                        defaultValue={subCategory}
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
                  ) : (
                    // ) : sub ? (
                    //   <View style={{ alignSelf: "center" }}>
                    //     <Text style={styles.title}>Sub bike Category</Text>
                    //     <SelectDropdown
                    //       data={
                    //         route?.params?.category == "Parts"
                    //           ? Parts.map((i) => i.title)
                    //           : bikedata.map((i) => i.title)
                    //       }
                    //       searchPlaceHolder={"Search here"}
                    //       search={true}
                    //       defaultValue={sub}
                    //       buttonStyle={styles.searchbox}
                    //       selectedRowStyle={{
                    //         backgroundColor: AppColors.primary,
                    //       }}
                    //       selectedRowTextStyle={{ color: AppColors.white }}
                    //       buttonTextStyle={{
                    //         textAlign: "left",
                    //         fontSize: width(3.5),
                    //       }}
                    //       dropdownStyle={styles.dropdown}
                    //       onSelect={(selectedItem, index) => {
                    //         console.log(selectedItem);
                    //         setFindValue(selectedItem)
                    //         setSubCategory(selectedItem);
                    //       }}
                    //       buttonTextAfterSelection={(selectedItem, index) => {
                    //         return selectedItem;
                    //       }}
                    //       rowTextForSelection={(item, index) => {
                    //         return item;
                    //       }}
                    //     />
                    //   </View>
                    // ) :
                    <></>
                  )}
                  {category && (
                    <View style={{ alignSelf: "center" }}>
                      <Text style={styles.title}>Brand</Text>
                      <SelectDropdown
                        data={vcompanies}
                        search={true}
                        defaultValue={brand}
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
                  <View style={{ alignSelf: "center" }}>
                    <Text style={styles.title}>Sort By</Text>
                    <SelectDropdown
                      data={sortdata}
                      searchPlaceHolder={"Search here"}
                      search={true}
                      defaultValue={sortby}
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
                  <View style={{ paddingVertical: width(1) }}>
                    <Text style={styles.title}>Address</Text>
                    <Input
                      value={address}
                      setvalue={setAddress}
                      placeholder={"search by address"}
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
                      selectedBtn={(e) => {
                        setCondition(e.label);
                      }}
                    />
                  </View>

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
                      onPress={() => {
                        setData([]);
                        setempty(false);
                        if (pageNumber != 0) {
                          setPageNumber(1);
                        }
                        refRBSheet.current.close();
                        setFilter(filter + 1);
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
