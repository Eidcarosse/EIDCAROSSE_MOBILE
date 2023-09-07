import RadioButtonRN from "radio-buttons-react-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import Input from "../InputText";
import Button from "../button";
import styles from "./styles";

export default function SearchFilter({ search, setSearch, containerstyle }) {
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
          />
          <Button
            title={"Filter"}
            containerStyle={{
              width: width(40),
              borderRadius: width(2),
              backgroundColor: AppColors.primary,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
