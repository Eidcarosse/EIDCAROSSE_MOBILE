// import RadioButtonRN from "radio-buttons-react-native";
// import React, { useEffect, useRef } from "react";
// import { ActivityIndicator, ScrollView, Text, View } from "react-native";
// import { SelectList } from "react-native-dropdown-select-list";
// import AppColors from "../../utills/AppColors";
// import { height, width } from "../../utills/Dimension";
// import Input from "../InputText";
// import Button from "../button";
// import styles from "./styles";
// import SelectDropdown from "react-native-select-dropdown";
// import { geVehicleCategory, geVehicleMakes, getModel } from "../../backend/api";
// import {
//   selectBrandFilter,
//   selectCategoryFilter,
//   selectModelFilter,
//   setAppLoader,
//   setBrandFilter,
//   setCategoryFilter,
//   setModelFilter,
// } from "../../redux/slices/config";
// import { useDispatch, useSelector } from "react-redux";
// import categories from "../../svgcomponents";

// export default function SearchFilter({
//   onPressClear,
//   onPressFilter,
//   containerstyle,
//   category,
//   setCategory = () => null,
//   setSortby = () => null,
//   setBrand = () => null,
//   setCondition = () => null,
//   pricefrom,
//   setPricefrom = () => null,
//   priceto,
//   setPriceto = () => null,
// }) {
//   const [loder, setLoder] = React.useState(false);
//   const [vcompanies, setVcompanies] = React.useState([]);
//   const [vCategory, setVCategory] = React.useState();

//   useEffect(() => {
//     getvehicleMake();
//   }, [category]);
//   const getvehicleMake = async () => {
//     setLoder(true);
//     let vehicledata = await geVehicleMakes(category);

//     if (vehicledata) {
//       setLoder(false);
//       setVcompanies(vehicledata);
//     } else {
//       setLoder(false);
//       setVcompanies([]);
//     }
//     setLoder(false);
//   };
//   // useEffect(() => {
//   //   if (brand) getmodel(find, brand);
//   // }, [brand]);
//   // const getmodel = async (a, b) => {
//   //   dispatch(setAppLoader(true));
//   //   let cardata = await getModel(a, b);

//   //   if (cardata) {
//   //     setapiModel(cardata);
//   //     dispatch(setAppLoader(false));
//   //   } else {
//   //     setapiModel(false);
//   //     dispatch(setAppLoader(false));
//   //   }
//   //   dispatch(setAppLoader(false));
//   // };
//   const rdata = [
//     {
//       label: "new",
//     },
//     {
//       label: "used",
//     },
//     {
//       label: "recondition",
//     },
//   ];
//   const sortdata = [
//     "A to Z (title)",
//     "Z to A (title)",
//     "Price (low to high)",
//     "Price (high to low)",
//   ];
//   const categorydata = [
//     "All",
//     "Autos",
//     "E-bikes",
//     "Bicycles",
//     "E-scooter",
//     "Motorcycle",
//     "Boats",
//     "Drones",
//     "Construction Machines",
//     "Trucks",
//     "Vans",
//     "Trailers",
//     "Buses",
//     "Others",
//   ];
//   return loder ? (
//     <ActivityIndicator color={AppColors.primary} size={"large"} />
//   ) : (
//     <View style={styles.container}>
//       <Text
//         style={{
//           fontSize: width(5),
//           fontWeight: "bold",
//           alignSelf: "center",
//         }}
//       >
//         Filters
//       </Text>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={{ alignSelf: "center" }}>
//           <Text style={styles.title}>Category</Text>
//           <SelectDropdown
//             data={categorydata}
//             searchPlaceHolder={"Search here"}
//             search={true}
//             defaultValue={category}
//             buttonStyle={styles.searchbox}
//             selectedRowStyle={{ backgroundColor: AppColors.primary }}
//             selectedRowTextStyle={{ color: AppColors.white }}
//             buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
//             dropdownStyle={styles.dropdown}
//             onSelect={(selectedItem, index) => {
//               setCategory(selectedItem);
//             }}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}
//           />
//         </View>
//         <View style={{ alignSelf: "center" }}>
//           <Text style={styles.title}>Sort By</Text>
//           <SelectDropdown
//             data={sortdata}
//             searchPlaceHolder={"Search here"}
//             search={true}
//             buttonStyle={styles.searchbox}
//             selectedRowStyle={{ backgroundColor: AppColors.primary }}
//             selectedRowTextStyle={{ color: AppColors.white }}
//             buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
//             dropdownStyle={styles.dropdown}
//             onSelect={(selectedItem, index) => {
//               setSortby(selectedItem);
//             }}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}
//           />
//         </View>
//         {/* <View style={{ alignSelf: "center" }}>
//           <Text style={styles.title}>Radius Search</Text>
//           <SelectList
//             setSelected={(val) => setRadius(val)}
//             data={data}
//             save="value"
//             boxStyles={styles.searchbox}
//             dropdownStyles={styles.dropdown}
//           />
//         </View> */}
//         <View style={{ paddingLeft: 4, paddingVertical: width(1) }}>
//           <Text style={styles.title}>Price Rang (CHF)</Text>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Input
//               value={pricefrom}
//               setvalue={setPricefrom}
//               placeholder={"From"}
//               containerStyle={styles.price}
//             />
//             <Input
//               value={priceto}
//               setvalue={setPriceto}
//               placeholder={"to"}
//               containerStyle={styles.price}
//             />
//           </View>
//         </View>
//         <View style={{ alignSelf: "center" }}>
//           <Text style={styles.title}>Condition</Text>

//           <RadioButtonRN
//             data={rdata}
//             circleSize={width(3)}
//             boxStyle={{
//               width: width(90),
//               borderWidth: 0,
//               paddingVertical: width(1),
//             }}
//             activeColor={AppColors.primary}
//             selectedBtn={(e) => setCondition(e)}
//           />
//         </View>
//         {category && (
//           <View style={{ alignSelf: "center" }}>
//             <Text style={styles.title}>Brand</Text>
//             <SelectDropdown
//               data={vcompanies}
//               search={true}
//               searchPlaceHolder={"Search here"}
//               buttonStyle={styles.searchbox}
//               selectedRowStyle={{ backgroundColor: AppColors.primary }}
//               selectedRowTextStyle={{ color: AppColors.white }}
//               buttonTextStyle={{ textAlign: "left", fontSize: width(3.5) }}
//               dropdownStyle={styles.dropdown}
//               onSelect={(selectedItem, index) => {
//                 // if (model) modelRef.current.reset();
//                 setBrand(selectedItem);
//               }}
//               buttonTextAfterSelection={(selectedItem, index) => {
//                 // text represented after item is selected
//                 // if data array is an array of objects then return selectedItem.property to render after item is selected
//                 return selectedItem;
//               }}
//               rowTextForSelection={(item, index) => {
//                 // text represented for each item in dropdown
//                 // if data array is an array of objects then return item.property to represent item in dropdown
//                 return item;
//               }}
//             />
//           </View>
//         )}
//         {/* {apimodel.length != 0 && (
//           <View style={{ alignSelf: "center" }}>
//             <Text style={styles.title}>Model</Text>
//             <SelectDropdown
//               ref={modelRef}
//               searchPlaceHolder={"Search here"}
//               data={apimodel}
//               search={true}
//               buttonStyle={styles.searchbox}
//               selectedRowStyle={{ backgroundColor: AppColors.primary }}
//               selectedRowTextStyle={{ color: AppColors.white }}
//               buttonTextStyle={{
//                 textAlign: "left",
//                 fontSize: width(3.5),
//               }}
//               dropdownStyle={styles.dropdown}
//               onSelect={(selectedItem, index) => {
//                 setModel(selectedItem);
//               }}
//               buttonTextAfterSelection={(selectedItem, index) => {
//                 // text represented after item is selected
//                 // if data array is an array of objects then return selectedItem.property to render after item is selected
//                 return selectedItem;
//               }}
//               rowTextForSelection={(item, index) => {
//                 // text represented for each item in dropdown
//                 // if data array is an array of objects then return item.property to represent item in dropdown
//                 return item;
//               }}
//             />
//           </View>
//         )} */}
//         <View
//           style={{
//             padding: width(3),
//             flexDirection: "row",
//             width: width(90),
//             justifyContent: "space-around",
//           }}
//         >
//           <Button
//             title={"clear"}
//             containerStyle={{
//               width: width(40),
//               borderRadius: width(2),
//               backgroundColor: "grey",
//             }}
//             onPress={onPressClear}
//           />
//           <Button
//             title={"Filter"}
//             containerStyle={{
//               width: width(40),
//               borderRadius: width(2),
//               backgroundColor: AppColors.primary,
//             }}
//             onPress={onPressFilter}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
