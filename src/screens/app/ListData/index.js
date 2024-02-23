import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Button,
  Card,
  Head,
  IconButton,
  Input,
  ScreenWrapper,
} from "../../../components";
import AppColors from "../../../utills/AppColors";
//import { data } from "../../../utills/Data";
import RadioButtonRN from "radio-buttons-react-native";
import { useTranslation } from "react-i18next";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import {
  backEndDataAPi,
  geVehicleCategory,
  geVehicleMakes,
  getAllData,
  getModel,
} from "../../../backend/api";
import { selectCategoryList, setAppLoader } from "../../../redux/slices/config";

import { useRoute } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import ScreenNames from "../../../routes/routes";
import { sortList } from "../../../utills/Data";
import { height, width } from "../../../utills/Dimension";
import {
  getConditionInitailValue,
  getGenderInitialValue,
  getPContitionInitialValue,
  shouldRenderField,
  showType,
} from "../../../utills/Methods";
import styles from "./styles";

export default function ListData({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const cat = route?.params?.category;
  const find = route?.params?.find;
  const sub = route?.params?.subcategory;
  const ti = route?.params?.search;
  const refRBSheet = useRef();
  const [modal, setModal] = useState(false);
  const s = useSelector(selectCategoryList);
  const [feild, setFeild] = useState();
  const dispatch = useDispatch();
  const [findValue, setFindValue] = useState(sub);
  const brandRef = useRef();
  const modelRef = useRef();
  const [sortby, setSortby] = useState("");
  const [address, setAddress] = useState("");
  const [subCategory, setSubCategory] = useState(sub);

  const [title, setTitle] = useState(ti || "");
  const [pageNumber, setPageNumber] = useState(1);
  const [pricefrom, setPricefrom] = useState();
  const [priceto, setPriceto] = useState("");
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState(cat);
  const [searchString, setSearchString] = useState("");
  const [km, setKm] = useState("");
  const [refreshing, onRefresh] = useState(false);
  const [refresh, setRefreshing] = useState(false);
  const [empty, setempty] = useState(false);
  const [year, setYear] = useState("");
  const [bodyshape, setBodyshap] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [exterior, setExterior] = useState("");
  const [interior, setInterior] = useState("");
  const [type, setType] = useState();
  const [loder, setLoder] = useState(false);
  const [vcompanies, setVcompanies] = useState([]);
  const [vCategory, setVCategory] = useState();
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState([]);
  const [totalAds, setTotalAds] = useState(0);
  const [apimodel, setapiModel] = useState([]);

  const [otherBrand, setOtherBrand] = useState(false);
  const [otherModel, setOtherModel] = useState(false);

  {
    /**-----------new----------------- */
  }

  const [pricing, setPricing] = useState("Price");
  const [salaryRequire, setSalaryRequire] = useState(null);
  const [vtype, setVtype] = useState();
  // const [area, setArea] = useState("");
  // const [companyName, setCompanyName] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  // const [salaryPeriod, setSalaryPeriod] = useState("");
  // const [positionType, setPositionType] = useState("");
  // const [breed, setBreed] = useState(edit?.animalZ?.breed || "");
  // const [age, setAge] = useState(edit?.animalZ?.age || "");
  // const [drivenHours, setDrivenHours] = useState(edit?.vhclZ?.hrzDrvn || "");
  // const [workingHours, setWorkingHours] = useState(
  //   edit?.bznessInAg?.workingHours || ""
  // );
  // const [downPayment, setDownPayment] = useState(edit?.vhclZ?.dwnPymnt || "");
  // const [installments, setInstallments] = useState(
  //   edit?.vhclZ?.mnthlyInstl || ""
  // );
  // const [installmentPlan, setInstallmentPlan] = useState(
  //   edit?.vhclZ?.instlPlan || ""
  // );
  const [bedRooms, setBedRooms] = useState("");
  const [bathRooms, setBathRooms] = useState("");
  const [iAm, setIAm] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [gender, setGender] = useState("");
  const [propertyCondition, setPropertyCondition] = useState("");

  let uniqueEntries = {};
  const queryParams = {
    address: address.trim() || "",
    category: category || "",
    subCategory: subCategory || "",
    condition: condition || "",
    title: title.trim() || "",
    brand: brand || "",
    model: model || "",
    year: year || "",
    type: type || "",
    minPrice: priceto || "",
    maxPrice: pricefrom || "",
    sortBy: sortby || "",
    km: km || "",
    bodyShape: bodyshape || "",
    gearBox: gearbox || "",
    fuelType: fueltype || "",
    page: pageNumber, // Adjust the page number as needed
  };
  const clearAll = () => {
    setTitle("");
    setAddress("");
    setBrand("");
    setModel("");
    setYear("");
    setPricefrom("");
    setPriceto("");
    setSortby("");
    setKm("");
    setBodyshap("");
    setGearbox("");
    setFueltype("");
    setCondition("");
    setData([]);
    setempty(false);
    setCategory("");
    setSubCategory("");
    setFindValue("");
    if (pageNumber != 0) {
      setPageNumber(1);
    }
    setFilter(filter + 1);
  };

  useEffect(() => {
    dispatch(setAppLoader(true));
    getData();
    dispatch(setAppLoader(false));
  }, []);
  useEffect(() => {
    if (brand) getmodel(findValue, brand);
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
  useEffect(() => {
    if (filter) getData();
  }, [filter]);
  const handleEndReached = () => {
    getData();
  };
  useEffect(() => {
    getvehicleMake();
    if (showType(subCategory)) {
      getvehicleSubCategory();
    }
    getFeilds();
  }, [category]);
  const getFeilds = async () => {
    let data = await backEndDataAPi({
      type: findValue,
    });
    setFeild(data);
  };
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
    let vehicledata = await geVehicleCategory(findValue);
    if (vehicledata) {
      setVCategory(vehicledata);
    } else {
      setVCategory([]);
    }
  };
  const getSubcategoriesByName = (categories, categoryName) => {
    const matchedCategory = categories.find(
      (category) => category.name === categoryName
    );

    if (matchedCategory) {
      return matchedCategory;
    }

    // Return an empty array if no match is found
    return [];
  };

  const getData = async () => {
    onRefresh(true);
    let d = await getAllData(queryParams);
    if (d?.ad.length == 0) {
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
      key: "New",
      label: t("condition.new"),
    },
    {
      key: "Used",
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
      label: t("condition.price"),
    },
    {
      key: "Free",
      label: t("addPost.Free"),
    },
    {
      key: "Contact",
      label: t("addPost.Contact"),
    },
  ];
  const pcdata = [
    {
      key: "Yes",
      label: t("addPost.furnished"),
    },
    {
      key: "No",
      label: t("addPost.unFurnished"),
    },
  ];
  const gdata = [
    {
      key: "Male",
      label: t("addPost.Male"),
    },
    {
      key: "Female",
      label: t("addPost.Female"),
    },
  ];
  const otherModelFuntion = () => {
    if (!otherModel) {
      if (model) {
        setModel("");
      }
      setModel("Others");
      setOtherModel(!otherModel);
    } else {
      if (model) {
        setModel("");
      }
      setOtherModel(!otherModel);
    }
  };
  const otherBrandFuntion = () => {
    if (!otherBrand) {
      if (model) {
        setModel("");
        setOtherModel(false);
      }
      setBrand("Others");
      setOtherBrand(!otherBrand);
    } else {
      if (brand) {
        setModel("");
        setBrand("");
      }
      setOtherBrand(!otherBrand);
    }
  };
  const Refresh = async () => {
    // setRefreshing(true);
    dispatch(setAppLoader(true));
    setData([]);
    setempty(false);
    if (pageNumber != 0) {
      setPageNumber(1);
    }
    setFilter(filter + 1);
    setTimeout(() => {
      dispatch(setAppLoader(false));
    }, 1000);
  };

  return (
    <ScreenWrapper
      showStatusBar={false}
      headerUnScrollable={() => (
        <View style={{ backgroundColor: "white" }}>
          <Head
            headtitle={category ? t(`category.${category}`) : "allData.title"}
            navigation={navigation}
          />
          <IconButton
            title={title ? title : t("searchbar.phsearch")}
            containerStyle={{
              backgroundColor: "white",
              width: width(98),
              borderWidth: height(0.05),
              marginVertical: height(1),
            }}
            textStyle={{
              color: "grey",
              fontWeight: "100",
              fontSize: height(1.5),
              width: width(80),
            }}
            icon={
              <Ionicons
                name="search"
                style={{ marginHorizontal: height(1) }}
                color="lightgrey"
                size={height(2.5)}
              />
            }
            onPress={() => {
              navigation.pop();
              navigation.replace(ScreenNames.SEARCH, {
                category: category,
                find: category,
                search: title,
                sub: subCategory,
                show: true,
              });
            }}
          />
          <View style={styles.totalview}>
            <Text style={styles.totaltext}>
              {t("allData.totalresult")} : {totalAds}
            </Text>
            <View style={styles.iconview}>
            <TouchableOpacity
                style={{ marginRight:height(2)}}
                onPress={() => {
                  // refRBSheet.current.open()
                }}
              >
                <MaterialIcons
                  name="sort"
                  size={height(3)}
                  color={AppColors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity

                onPress={() => {
                  setModal(true);
                  // refRBSheet.current.open()
                }}
              >
                <FontAwesome
                  name="sliders"
                  size={height(3)}
                  color={AppColors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      // refreshing={refresh}
      // onRefresh={Refresh}
    >
      <View style={styles.mainViewContainer}>
        <FlatList
          key={"coloum1"}
          data={data.filter((entry) => {
            if (!uniqueEntries[entry._id]) {
              uniqueEntries[entry._id] = true;
              return true;
            }
            return false;
          })}
          style={styles.flatlist}
          renderItem={({ item }) => (
            <View style={{ width: width(98), alignItems: "center" }}>
              <Card data={item} />
            </View>
          )}
          ListEmptyComponent={({ item }) => (
            <View style={styles.emptyview}>
              {refreshing ? (
                <ActivityIndicator size={"large"} color={AppColors.primary} />
              ) : (
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: height(1.5),
                      alignSelf: "center",
                    }}
                  >
                    {t("commmon.nothingtoshow")}
                  </Text>
                  <Image source={Icons.empty} style={styles.emptyimage} />
                </View>
              )}
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={Refresh}
              colors={[AppColors.primary]}
            />
          }
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
      </View>
      {/**-----filter---- */}
      <Modal
        isVisible={modal}
        backdropColor={AppColors.white}
        backdropOpacity={1}
        animationOutTiming={600}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
        useNativeDriverForBackdrop={true}
        avoidKeyboard={false}
      >
        {refreshing ? (
          <ActivityIndicator color={AppColors.primary} size={"large"} />
        ) : (
          <View
            style={{
              backgroundColor: "white",
              padding: height(2),
              height: height(90),
              width: width(100),
              alignSelf: "center",
            }}
          >
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
                  fontSize: height(3),
                  fontWeight: "bold",
                }}
              >
                {t("allData.filter")}
              </Text>
              <TouchableOpacity onPress={() => setModal(false)}>
                <AntDesign
                  name="closesquare"
                  size={height(3)}
                  color={AppColors.primary}
                />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <IconButton
                onPress={() => {
                  setModal(false);
                  setTimeout(() => {
                    navigation.pop();
                    navigation.navigate(ScreenNames.CATEGORY, {
                      search: title,
                      value: "seeAll",
                    });
                  }, 600);
                }}
                title={
                  category ? t(`category.${category}`) : "filter.selectCategory"
                }
                containerStyle={styles.containerb}
                textStyle={styles.texticon}
                iconright={<Ionicons name="chevron-forward" size={height(2)} />}
              />

              {subCategory && (
                <IconButton
                  onPress={() => {
                    setModal(false);
                    setTimeout(() => {
                      navigation.pop();
                      navigation.navigate(ScreenNames.BIKECATEGORY, {
                        category: getSubcategoriesByName(s, category),
                        find: category,
                        search: title,
                        show: true,
                      });
                    }, 600);
                  }}
                  title={t(`subList.${subCategory}`)}
                  containerStyle={styles.containerb}
                  textStyle={styles.texticon}
                  iconright={
                    <Ionicons name="chevron-forward" size={height(2)} />
                  }
                />
              )}
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>{t("allData.sortby")}</Text>
                <SelectDropdown
                  data={sortList}
                  defaultValueByIndex={sortby ? -1 : 0}
                  defaultButtonText={
                    t(sortList.find((item) => item.value == sortby)?.key) ||
                    t("allData.defaultValueDropdown")
                  }
                  searchPlaceHolder={t("allData.phsearchHere")}
                  defaultValue={sortby}
                  buttonStyle={styles.searchbox}
                  selectedRowStyle={{
                    backgroundColor: AppColors.primary,
                  }}
                  selectedRowTextStyle={{ color: AppColors.white }}
                  buttonTextStyle={{
                    textAlign: "left",
                    fontSize: height(1.6),
                  }}
                  dropdownStyle={styles.dropdown}
                  onSelect={(selectedItem, index) => {
                    setSortby(selectedItem.value);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return t(`${selectedItem.key}`);
                  }}
                  rowTextForSelection={(item, index) => {
                    return t(item.key);
                  }}
                />
              </View>

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
              {/*-----------------salary from---------------*/}
              {shouldRenderField("SalaryFrom", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.salaryFrom")}</Text>
                  <Input
                    value={salaryFrom}
                    setvalue={setSalaryFrom}
                    placeholder={t("addPost.enterSalaryFrom")}
                    keyboardType="number-pad"
                    containerStyle={[
                      styles.price,
                      { width: width(90) },
                      salaryRequire && styles.required,
                    ]}
                  />
                  {salaryRequire && (
                    <Text style={styles.require}>*{t(`addPost.require`)}</Text>
                  )}
                </View>
              )}
              {/*-----------------bedroom---------------*/}
              {shouldRenderField("Bedrooms", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.bedrooms")}</Text>
                  <Input
                    value={bedRooms}
                    setvalue={setBedRooms}
                    placeholder={t("addPost.enterBedrooms")}
                    keyboardType="number-pad"
                    containerStyle={[styles.price, { width: width(90) }]}
                  />
                </View>
              )}
              {/*-----------------bathroom---------------*/}
              {shouldRenderField("bathrooms", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.bathrooms")}</Text>
                  <Input
                    value={bathRooms}
                    setvalue={setBathRooms}
                    placeholder={t("addPost.enterBathrooms")}
                    keyboardType="number-pad"
                    containerStyle={[styles.price, { width: width(90) }]}
                  />
                </View>
              )}
              {/*-----------------condition---------------*/}
              {shouldRenderField("Furnished", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.condition")}</Text>

                  <RadioButtonRN
                    data={pcdata}
                    initial={getPContitionInitialValue(gender)}
                    textStyle={{ fontSize: height(1.5) }}
                    circleSize={width(3)}
                    boxStyle={{
                      width: width(90),
                      borderWidth: 0,
                      paddingVertical: width(1),
                    }}
                    activeColor={AppColors.primary}
                    selectedBtn={(e) => {
                      setPropertyCondition(e.key);
                    }}
                  />
                </View>
              )}
              {/*-----------------gender---------------*/}
              {shouldRenderField("Gender", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.gender")}</Text>

                  <RadioButtonRN
                    data={gdata}
                    initial={getGenderInitialValue(gender)}
                    textStyle={{ fontSize: height(1.5) }}
                    circleSize={width(3)}
                    boxStyle={{
                      width: width(90),
                      borderWidth: 0,
                      paddingVertical: width(1),
                    }}
                    activeColor={AppColors.primary}
                    selectedBtn={(e) => {
                      setGender(e.key);
                    }}
                  />
                </View>
              )}
              {/*-----------------looking for---------------*/}
              {shouldRenderField("Looking For", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.lookingFor")}</Text>

                  <RadioButtonRN
                    data={gdata}
                    initial={getGenderInitialValue(lookingFor)}
                    textStyle={{ fontSize: height(1.5) }}
                    circleSize={width(3)}
                    boxStyle={{
                      width: width(90),
                      borderWidth: 0,
                      paddingVertical: width(1),
                    }}
                    activeColor={AppColors.primary}
                    selectedBtn={(e) => {
                      setLookingFor(e.key);
                    }}
                  />
                </View>
              )}
              {/*-----------------condition Vahecal---------------*/}
              {shouldRenderField("Condition", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.condition")}</Text>

                  <RadioButtonRN
                    data={rdata}
                    initial={getConditionInitailValue(condition)}
                    textStyle={{ fontSize: height(1.5) }}
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
              {/*-----------------Type or bodytype---------------*/}
              {!(vCategory == undefined || vCategory == []) && category && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.type")}</Text>

                  <SelectDropdown
                    defaultButtonText={t("addPost.defaultValueDropdown")}
                    data={vCategory}
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{
                      backgroundColor: AppColors.primary,
                    }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: height(1.6),
                    }}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      setType(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return t(`type.${selectedItem}`);
                    }}
                    rowTextForSelection={(item, index) => {
                      return t(`type.${item}`);
                    }}
                  />
                </View>
              )}
              {/*-----------------brand---------------*/}
              {shouldRenderField("Brand", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.brand")}</Text>
                  <SelectDropdown
                    ref={brandRef}
                    defaultButtonText={
                      brand
                        ? brand === "Others"
                          ? t("category.Others")
                          : brand
                        : t("addPost.defaultValueDropdown")
                    }
                    data={vcompanies}
                    disabled={otherBrand}
                    search={true}
                    searchInputStyle
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={[styles.searchbox]}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={[
                      { textAlign: "left", fontSize: height(1.6) },
                      otherBrand && { color: "grey" },
                    ]}
                    dropdownStyle={styles.dropdown}
                    onSelect={(selectedItem, index) => {
                      if (model) {
                        modelRef.current.reset();
                        setModel("");
                      }
                      setBrand(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      paddingVertical: width(4),
                      alignSelf: "flex-start",
                      alignItems: "center",
                    }}
                    onPress={otherBrandFuntion}
                  >
                    <CheckBox
                      checkedImage={
                        <MaterialIcons
                          name="check-box"
                          size={height(2)}
                          color={AppColors.primary}
                        />
                      }
                      unCheckedImage={
                        <MaterialIcons
                          name="check-box-outline-blank"
                          size={height(2)}
                        />
                      }
                      style={{ paddingRight: width(2) }}
                      isChecked={otherBrand}
                      onClick={otherBrandFuntion}
                    />
                    <Text style={{ fontSize: height(1.5) }}>
                      {t("category.Others")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/*-----------------render after select brand---------------*/}
              {brand &&
                (apimodel && brand != "Others" ? (
                  <View style={{ alignSelf: "center" }}>
                    <Text style={styles.title}>{t("addPost.model")}</Text>
                    <SelectDropdown
                      defaultButtonText={
                        model
                          ? model === "Others"
                            ? t("category.Others")
                            : model
                          : t("addPost.defaultValueDropdown")
                      }
                      ref={modelRef}
                      searchPlaceHolder={t("addPost.phsearchHere")}
                      data={apimodel}
                      disabled={otherModel}
                      search={true}
                      buttonStyle={styles.searchbox}
                      selectedRowStyle={{
                        backgroundColor: AppColors.primary,
                      }}
                      selectedRowTextStyle={{ color: AppColors.white }}
                      buttonTextStyle={[
                        { textAlign: "left", fontSize: height(1.6) },
                        otherModel && { color: "grey" },
                      ]}
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
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        paddingVertical: width(4),
                        alignSelf: "flex-start",
                        alignItems: "center",
                      }}
                      onPress={otherModelFuntion}
                    >
                      <CheckBox
                        checkedImage={
                          <MaterialIcons
                            name="check-box"
                            size={height(2)}
                            color={AppColors.primary}
                          />
                        }
                        unCheckedImage={
                          <MaterialIcons
                            name="check-box-outline-blank"
                            size={height(2)}
                          />
                        }
                        style={{ paddingRight: width(2) }}
                        checkedCheckBoxColor={AppColors.primary}
                        isChecked={otherModel}
                        onClick={otherModelFuntion}
                      />
                      <Text style={{ fontSize: height(1.5) }}>
                        {t("category.Others")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                ))}
              {/*-----------------Year---------------*/}
              {shouldRenderField("Year", category, subCategory) && (
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
              {/*-----------------body shap---------------*/}
              {shouldRenderField("bodyShap", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.bodyshape")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      bodyshape
                        ? t(`bodyShapeList.${bodyshape}`)
                        : t("addPost.defaultValueDropdown")
                    }
                    data={
                      category == "Bikes"
                        ? feild?.bikeBodyShape
                        : feild?.AutosBodyShape
                    }
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{
                      backgroundColor: AppColors.primary,
                    }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: height(1.6),
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
              {/*-----------------Gear box---------------*/}
              {shouldRenderField("gearBox", category, subCategory) &&
                feild?.gearBox && (
                  <View style={{ alignSelf: "center" }}>
                    <Text style={styles.title}>{t("addPost.gearbox")}</Text>
                    <SelectDropdown
                      defaultButtonText={
                        gearbox
                          ? t(`gearBoxList.${gearbox}`)
                          : t("addPost.defaultValueDropdown")
                      }
                      data={feild.gearBox}
                      searchPlaceHolder={t("addPost.phsearchHere")}
                      buttonStyle={styles.searchbox}
                      selectedRowStyle={{
                        backgroundColor: AppColors.primary,
                      }}
                      selectedRowTextStyle={{ color: AppColors.white }}
                      buttonTextStyle={{
                        textAlign: "left",
                        fontSize: height(1.6),
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
              {/*-----------------fule type---------------*/}
              {shouldRenderField("fuelType", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.fueltype")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      fueltype
                        ? t(`fuelTypelist.${fueltype}`)
                        : t("addPost.defaultValueDropdown")
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
                      fontSize: height(1.6),
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
              {/*-----------------exterior color---------------*/}
              {shouldRenderField("ExteriorColor", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.exteriorcolor")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      exterior
                        ? t(`colorList.${exterior}`)
                        : t("addPost.defaultValueDropdown")
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
                      fontSize: height(1.6),
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
              {/*-----------------Interior color---------------*/}
              {shouldRenderField("interirColor", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.interiorcolor")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      interior
                        ? t(`colorList.${interior}`)
                        : t("addPost.defaultValueDropdown")
                    }
                    data={feild?.interiorColor}
                    searchPlaceHolder={t("addPost.phsearchHere")}
                    buttonStyle={styles.searchbox}
                    selectedRowStyle={{ backgroundColor: AppColors.primary }}
                    selectedRowTextStyle={{ color: AppColors.white }}
                    buttonTextStyle={{
                      textAlign: "left",
                      fontSize: height(1.6),
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
              {/*-----------------Km---------------*/}
              {shouldRenderField("km", category, subCategory) && (
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
                      fontSize: height(1.6),
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
            </ScrollView>
            {/**-----button----- */}
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
                onPress={() => {
                  clearAll();
                  setModal(false);
                }}
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
                  setModal(false);
                  setFilter(filter + 1);
                }}
              />
            </View>
          </View>
        )}
      </Modal>
    </ScreenWrapper>
  );
}
