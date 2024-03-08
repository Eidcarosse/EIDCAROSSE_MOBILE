import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import Modal from "react-native-modal";

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
import ScreenNames from "../../../routes/routes";
import { sortList } from "../../../utills/Data";
import { height, width } from "../../../utills/Dimension";
import {
  getConditionInitailValue,
  getPriceInitialValue,
  shouldRenderField,
} from "../../../utills/Methods";
import styles from "./styles";

export default function ListData({ navigation }) {
  const route = useRoute();
  const { t } = useTranslation();
  const cat = route?.params?.category;
  const sub = route?.params?.subcategory;
  const ti = route?.params?.search;
  const [modal, setModal] = useState(false);
  const s = useSelector(selectCategoryList);
  const [feild, setFeild] = useState();
  const dispatch = useDispatch();
  const brandRef = useRef();
  const modelRef = useRef();
  const [refreshing, onRefresh] = useState(false);
  const [refresh, setRefreshing] = useState(false);
  const [empty, setempty] = useState(false);
  const [loder, setLoder] = useState(false);
  const [vcompanies, setVcompanies] = useState([]);
  const [vCategory, setVCategory] = useState();
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState([]);
  const [totalAds, setTotalAds] = useState(0);
  const [apimodel, setapiModel] = useState([]);
  const [otherBrand, setOtherBrand] = useState(false);
  const [otherModel, setOtherModel] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  ///send params
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
  const [km, setKm] = useState("");
  const [year, setYear] = useState("");
  const [bodyshape, setBodyshap] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [type, setType] = useState();
  const [pricing, setPricing] = useState("Price");
  const [drivenHours, setDrivenHours] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [installments, setInstallments] = useState("");
  const [installmentPlan, setInstallmentPlan] = useState("");
  let uniqueEntries = {};
  const queryParams = {
    address: address.trim() || "",
    category: category || "",
    subCategory: subCategory || "",
    condition: condition || "",
    title: title.trim() || "",
    brand: brand || "",
    model: model || "",
    Price: ((pricing == "Free" || pricing == "Contact") && pricing) || "",
    year: year || "",
    type: type || "",
    minPrice: pricefrom || "",
    maxPrice: priceto || "",
    sortBy: sortby || "",
    km: km || "",
    bodyShape: bodyshape || "",
    gearBox: gearbox || "",
    fuelType: fueltype || "",
    workingHours: workingHours || "",
    hrzDrvn: drivenHours || "",
    dwnPymnt: downPayment || "",
    mnthlyInstl: installments || "",
    instlPlan: installmentPlan || "",
    page: pageNumber, // Adjust the page number as needed
  };

  const clearAll = () => {
    setAddress("");
    setCondition("");
    setBrand("");
    setOtherBrand(false);
    setModel("");
    setOtherModel(false);
    setPricing("Price");
    setYear("");
    setType("");
    setPricefrom("");
    setPriceto("");
    setKm("");
    setBodyshap("");
    setGearbox("");
    setFueltype("");
    setWorkingHours("");
    setDrivenHours("");
    setDownPayment("");
    setInstallments("");
    setInstallmentPlan("");
    setData([]);
    setempty(false);
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
    if (brand) getmodel(subCategory, brand);
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
  // useEffect(() => {
  //   getvehicleMake();
  //   if (showType(subCategory)) {
  //     getvehicleSubCategory();
  //   }
  //   getFeilds();
  // }, [category]);
  useEffect(() => {
    getvehicleMake();
    getFeilds();
    if (shouldRenderField("Type", category, subCategory)) {
      getvehicleSubCategory();
    }
  }, [subCategory]);
  const getFeilds = async () => {
    let data = await backEndDataAPi({
      cat: category,
      subcat: subCategory,
    });
    setFeild(data);
  };
  const getvehicleMake = async () => {
    setLoder(true);
    let vehicledata = await geVehicleMakes(subCategory);
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
    let vehicledata = await geVehicleCategory(subCategory);
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
  const hideMenu = () => setModalVisible(false);
  const showMenu = () => setModalVisible(true);
  const getData = async () => {
    onRefresh(true);
    let d = await getAllData(queryParams);
    if (d?.ad?.length == 0) {
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
  const otherModelFuntion = () => {
    if (!otherModel) {
      if (model) {
        setModel("");
        modelRef?.current?.reset();
      }
      setModel("Others");
      setOtherModel(!otherModel);
    } else {
      if (model) {
        setModel("");
        modelRef?.current?.reset();
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
      brandRef?.current?.reset();
      setBrand("Others");
      setOtherBrand(!otherBrand);
    } else {
      if (brand) {
        setModel("");
        setBrand("");
        brandRef?.current?.reset();
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
  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

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
              marginVertical: height(2),
            }}
            textStyle={{
              color: "grey",
              fontWeight: "400",
              fontSize: height(1.5),
              width: width(80),
              paddingHorizontal: width(1),
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
              navigation.replace(ScreenNames.SEARCH, {
                category: category,
                find: category,
                search: title,
                sub: subCategory,
                show: true,
              });
            }}
            iconright={
              <>
                {title && (
                  <MaterialIcons
                    name="close"
                    style={{ marginHorizontal: height(1) }}
                    color={AppColors.primary}
                    size={height(2.5)}
                  />
                )}
              </>
            }
            onPressRightIcon={() => {
              setTitle("");
              setData([]);
              setempty(false);
              if (pageNumber != 0) {
                setPageNumber(1);
              }
              setFilter(filter + 1);
            }}
          />
          <View style={styles.totalview}>
            {title || category ? (
              <Text style={styles.totaltext}>
                {t("allData.totalresult")} : {totalAds}
              </Text>
            ) : (
              <View />
            )}
            <View style={styles.iconview}>
              <>
                <TouchableOpacity
                  style={{ marginRight: height(2) }}
                  onPress={showMenu}
                >
                  <MaterialIcons
                    name="sort"
                    size={height(3)}
                    color={AppColors.primary}
                  />
                </TouchableOpacity>
                <Menu
                  visible={isModalVisible}
                  style={{ borderRadius: height(2), padding: height(1) }}
                  onRequestClose={hideMenu}
                >
                  {sortList.map((selectedItem, index) => (
                    <MenuItem
                      key={index}
                      style={{
                        borderRadius: height(1),
                        backgroundColor:
                          selectedItem.value == sortby
                            ? AppColors.primary
                            : "white",
                      }}
                      onPress={() => {
                        setSortby(selectedItem.value);
                        hideMenu();
                        setData([]);
                        setempty(false);
                        if (pageNumber != 0) {
                          setPageNumber(1);
                        }
                        setFilter(filter + 1);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height(1.5),
                          color:
                            selectedItem.value == sortby
                              ? AppColors.white
                              : AppColors.black,
                        }}
                      >
                        {t(`${selectedItem.key}`)}
                      </Text>
                    </MenuItem>
                  ))}
                </Menu>
              </>
              <TouchableOpacity onPress={openModal}>
                <FontAwesome
                  name="sliders"
                  size={height(2.8)}
                  color={AppColors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      refreshing={refresh}
      onRefresh={Refresh}
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
        animationOutTiming={100}
        animationInTiming={200}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        useNativeDriverForBackdrop={true}
        avoidKeyboard={false}
      >
        {refreshing ? (
          <ActivityIndicator color={AppColors.primary} size={"large"} />
        ) : (
          <ScreenWrapper
            scrollEnabled
            headerUnScrollable={() => (
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
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign
                    name="closesquare"
                    size={height(3)}
                    color={AppColors.primary}
                  />
                </TouchableOpacity>
              </View>
            )}
            footerUnScrollable={() => (
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
                    closeModal();
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
                    closeModal();
                    setFilter(filter + 1);
                  }}
                />
              </View>
            )}
          >
            <View style={{ paddingBottom: height(2) }}>
              {/*-----------------category---------------*/}
              <IconButton
                onPress={() => {
                  try {
                    closeModal();
                    setTimeout(() => {
                      navigation.replace(ScreenNames.CATEGORY, {
                        search: title,
                        value: "seeAll",
                      });
                    }, 700);
                  } catch (error) {
                    console.log("navigation", error);
                  }
                }}
                title={
                  category ? t(`category.${category}`) : "filter.selectCategory"
                }
                containerStyle={styles.containerb}
                textStyle={styles.texticon}
                iconright={<Ionicons name="chevron-forward" size={height(2)} />}
              />
              {/*-----------------subcategory---------------*/}
              {subCategory && (
                <IconButton
                  onPress={() => {
                    try {
                      closeModal();
                      setTimeout(() => {
                        navigation.replace(ScreenNames.BIKECATEGORY, {
                          category: getSubcategoriesByName(s, category),
                          find: category,
                          search: title,
                          show: true,
                        });
                      }, 700);
                    } catch (error) {
                      console.log("navigation", error);
                    }
                  }}
                  title={t(`category.${subCategory}`)}
                  containerStyle={styles.containerb}
                  textStyle={styles.texticon}
                  iconright={
                    <Ionicons name="chevron-forward" size={height(2)} />
                  }
                />
              )}
              {/*-----------------address---------------*/}
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
              {/*-----------------Price---------------*/}
              {shouldRenderField("Price", category, subCategory) && (
                <>
                  <View style={{ alignSelf: "center" }}>
                    <Text style={styles.title}>{t("addPost.pricing")}</Text>

                    <RadioButtonRN
                      data={pdata}
                      initial={getPriceInitialValue(pricing)}
                      textStyle={{ fontSize: height(1.5) }}
                      circleSize={width(3)}
                      boxStyle={{
                        width: width(90),
                        borderWidth: 0,
                        paddingVertical: width(1),
                      }}
                      activeColor={AppColors.primary}
                      selectedBtn={(e) => {
                        console.log(e?.key);
                        switch (e?.key) {
                          case "Free":
                            setPricing("Free");
                            setPricefrom("")
                            setPriceto("")
                            break;
                          case "Contact":
                            setPricing("Contact");
                            setPricefrom("")
                            setPriceto("")
                            break;
                          default:
                            setPricing("Price");
                        }
                      }}
                    />
                  </View>
                  {pricing == "Price" && (
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
                          keyboardType="numeric"
                          inputTextStyle={{ width: width(35) }}
                          setvalue={setPricefrom}
                          placeholder={"allData.from"}
                          containerStyle={styles.price}
                        />
                        <Input
                          value={priceto}
                          setvalue={setPriceto}
                          inputTextStyle={{ width: width(35) }}
                          keyboardType="numeric"
                          placeholder={"allData.to"}
                          containerStyle={styles.price}
                        />
                      </View>
                    </View>
                  )}
                </>
              )}
              {/*-----------------driven hours---------------*/}
              {shouldRenderField("Hours Driven", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.drivenHours")}</Text>
                  <Input
                    value={drivenHours}
                    setvalue={setDrivenHours}
                    keyboardType="number-pad"
                    placeholder={t("addPost.enterDrivenHours")}
                    containerStyle={[styles.price, { width: width(90) }]}
                  />
                </View>
              )}
              {/*-----------------working hours---------------*/}
              {shouldRenderField("Working Hours", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.workingHours")}</Text>
                  <Input
                    value={workingHours}
                    setvalue={setWorkingHours}
                    keyboardType="number-pad"
                    placeholder={t("addPost.enterWorkingHours")}
                    containerStyle={[styles.price, { width: width(90) }]}
                  />
                </View>
              )}
              {/*-----------------down payment---------------*/}
              {shouldRenderField("Down Payment", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>{t("addPost.downPayment")}</Text>
                  <Input
                    value={downPayment}
                    setvalue={setDownPayment}
                    keyboardType="number-pad"
                    placeholder={t("addPost.enterDownPayment")}
                    containerStyle={[styles.price, { width: width(90) }]}
                  />
                </View>
              )}
              {/*-----------------instalmentplan---------------*/}
              {shouldRenderField("Installment Plan", category, subCategory) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>
                    {t("addPost.installmentPlan")}
                  </Text>
                  <Input
                    value={installmentPlan}
                    setvalue={setInstallmentPlan}
                    placeholder={t("addPost.enterInstallmentPlan")}
                    containerStyle={[styles.price, { width: width(90) }]}
                  />
                </View>
              )}
              {/*-----------------monthly instalment---------------*/}
              {shouldRenderField(
                "Monthly Installments",
                category,
                subCategory
              ) && (
                <View style={{ paddingVertical: width(1) }}>
                  <Text style={styles.title}>
                    {t("addPost.monthlyInstallments")}
                  </Text>
                  <Input
                    value={installments}
                    setvalue={setInstallments}
                    keyboardType="number-pad"
                    placeholder={t("addPost.enterMonthlyInstallment")}
                    containerStyle={[styles.price, { width: width(90) }]}
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
                      setCondition(e?.key);
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
                    selectedRowStyle={{
                      backgroundColor: AppColors.primary,
                    }}
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
                  <IconButton
                    onPress={otherBrandFuntion}
                    title={t("category.Others")}
                    containerStyle={styles.container2}
                    textStyle={styles.texticon2}
                    iconright={
                      <FontAwesome
                        name={!otherBrand ? "toggle-off" : "toggle-on"}
                        color={!otherBrand ? "black" : AppColors.primary}
                        size={height(2.2)}
                      />
                    }
                    onPressRightIcon={otherBrandFuntion}
                  />
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
                    <IconButton
                      onPress={otherModelFuntion}
                      title={t("category.Others")}
                      containerStyle={styles.container2}
                      textStyle={styles.texticon2}
                      iconright={
                        <FontAwesome
                          name={!otherModel ? "toggle-off" : "toggle-on"}
                          color={!otherModel ? "black" : AppColors.primary}
                          size={height(2.2)}
                        />
                      }
                      onPressRightIcon={otherModelFuntion}
                    />
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
              {shouldRenderField("AutosBodyShape", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.bodyshape")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      bodyshape
                        ? t(`bodyShapeList.${bodyshape}`)
                        : t("addPost.defaultValueDropdown")
                    }
                    data={feild?.AutosBodyShape}
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
              {/*-----------------body shap---------------*/}
              {shouldRenderField("bikeBodyShape", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.bodyshape")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      bodyshape
                        ? t(`bodyShapeList.${bodyshape}`)
                        : t("addPost.defaultValueDropdown")
                    }
                    data={feild?.bikeBodyShape}
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
              {/*-----------------fule type---------------*/}
              {shouldRenderField("BikeFuelType", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.fueltype")}</Text>
                  <SelectDropdown
                    defaultButtonText={
                      fueltype
                        ? t(`fuelTypelist.${fueltype}`)
                        : t("addPost.defaultValueDropdown")
                    }
                    data={feild?.BikeFuelType}
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
              {/*-----------------Km---------------*/}
              {shouldRenderField("km", category, subCategory) && (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.title}>{t("addPost.km")}</Text>
                  <SelectDropdown
                    data={feild?.kilometers}
                    defaultButtonText={km || t("addPost.defaultValueDropdown")}
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
          </ScreenWrapper>
        )}
      </Modal>
    </ScreenWrapper>
  );
}
