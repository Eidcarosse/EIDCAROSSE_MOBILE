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
  Card,
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
import { useTranslation } from "react-i18next";
import categories from "../../../svgcomponents";
import { kilometers, sortList } from "../../../utills/Data";

export default function ListData({ navigation, route }) {
  const { t } = useTranslation();
  const cat = route?.params?.category;
  const find = route?.params?.find;
  const sub = route?.params?.subcategory;
  const ti = route?.params?.search;
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [findValue, setFindValue] = useState(find);
  const modelRef = useRef();
  const [sortby, setSortby] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [subCategory, setSubCategory] = React.useState(sub);
  const [title, setTitle] = React.useState(ti || "");
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pricefrom, setPricefrom] = React.useState();
  const [priceto, setPriceto] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [category, setCategory] = React.useState(cat);
  const [searchString, setSearchString] = useState("");
  const [km, setKm] = React.useState("");
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
  const [totalAds, setTotalAds] = useState(0);

  // const [columnumber, setcolumnumber] = useState(2);

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
    km: km,
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
      setTotalAds(d?.totalAds);
      setData((prevData) => [...prevData, ...d?.ad]);
      setPageNumber(pageNumber + 1);
    } else {
      setData([]);
    }
    onRefresh(false);
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
      key: "recondition",
      label: t("condition.Recondition"),
    },
  ];
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
        <Head
          headtitle={
            category
              ? t(categories?.find((cat) => cat.title === category)?.show)
              : "allData.title"
          }
          navigation={navigation}
        />
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
            {t("allData.totalresult")} : {totalAds}
          </Text>
          <View style={styles.iconview}>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
        {/* {columnumber == 2 ? (
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
        ) : ( */}
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
                <Card data={item} />
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
        {/* )} */}
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
                <View
                  style={{
                    marginBottom: width(3),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: width(6),
                      fontWeight: "bold",
                    }}
                  >
                    {t("allData.filter")}
                  </Text>
                  {/* <Text
                    style={{
                      fontSize: width(3),
                      color: AppColors.primary,
                    }}
                  >
                    close
                  </Text> */}
                </View>

                <ScrollView
                  style={{ height: height(57) }}
                  showsVerticalScrollIndicator={false}
                >
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
                      <Text style={styles.title}>{t("allData.sub")}</Text>
                      <SelectDropdown
                        data={vCategory}
                        defaultButtonText={t("allData.defaultValueDropdown")}
                        defaultValue={subCategory}
                        searchPlaceHolder={t("allData.phsearchHere")}
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
                      <Text style={styles.title}>{t("allData.brand")}</Text>
                      <SelectDropdown
                        defaultButtonText={t("allData.defaultValueDropdown")}
                        data={vcompanies}
                        search={true}
                        defaultValue={brand}
                        searchPlaceHolder={t("allData.phsearchHere")}
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
                    <Text style={styles.title}>{t("allData.sortby")}</Text>
                    <SelectDropdown
                      data={sortList}
                      defaultButtonText={t("allData.defaultValueDropdown")}
                      searchPlaceHolder={t("allData.phsearchHere")}
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
                        setSortby(selectedItem.value);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return t(selectedItem.key);
                      }}
                      rowTextForSelection={(item, index) => {
                        return t(item.key);
                      }}
                    />
                  </View>
                  {showKM(category) && (
                    <View style={{ alignSelf: "center" }}>
                      <Text style={styles.title}>{t("addPost.km")}</Text>
                      <SelectDropdown
                        data={kilometers}
                        defaultButtonText={t("addPost.defaultValueDropdown")}
                        searchPlaceHolder={t("addPost.phsearchHere")}
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
                          setKm(selectedItem.value);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          return t(selectedItem.value);
                        }}
                        // rowTextForSelection={(item, index) => {
                        //   console.log("xbuisxwixbuw",item);
                        //   // text represented for each item in dropdown
                        //   // if data array is an array of objects then return item.property to represent item in dropdown
                        //   return t(item.value);
                        // }}
                        rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return t(item.value);
                        }}
                      />
                    </View>
                  )}
                  {/* <View style={{ paddingVertical: width(1) }}>
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
                  </View> */}
                  <View style={{ paddingVertical: width(1) }}>
                    <Text style={styles.title}>{t("allData.address")}</Text>
                    <Input
                      value={address}
                      setvalue={setAddress}
                      placeholder={"allData.searchbyaddress"}
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
                    <Text style={styles.title}>{t("allData.pricerang")}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Input
                        value={pricefrom}
                        setvalue={setPricefrom}
                        placeholder={"allData.from"}
                        containerStyle={styles.price}
                      />
                      <Input
                        value={priceto}
                        setvalue={setPriceto}
                        placeholder={"allData.to"}
                        containerStyle={styles.price}
                      />
                    </View>
                  </View>
                  <View style={{ alignSelf: "center" }}>
                    <Text style={styles.title}>{t("allData.condition")}</Text>

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
                </ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    title={"allData.clear"}
                    containerStyle={{
                      width: width(48),
                      borderRadius: width(1),
                      backgroundColor: "grey",
                    }}
                    onPressClear={() => refRBSheet.current.close()}
                  />
                  <Button
                    title={"allData.search"}
                    containerStyle={{
                      width: width(40),
                      borderRadius: width(1),
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
              </View>
            )}
          </RBSheet>
        </View>
      </View>
    </ScreenWrapper>
  );
}
