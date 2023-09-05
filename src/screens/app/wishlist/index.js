import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Head, ScreenWrapper } from "../../../components";
import CardView from "../../../components/CardView";
import { selectUserMeta } from "../../../redux/slices/user";
import ScreenNames from "../../../routes/routes";
import AppColors from "../../../utills/AppColors";
import { data } from "../../../utills/Data";
import { width } from "../../../utills/Dimension";
import styles from "./styles";
export default function WishList({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"My Wish List"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primery}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={{ width: width(100), alignItems: "center" }}>
          {data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate(ScreenNames.DETAIL, item);
              }}
              key={index}
              style={{ width: width(100), alignItems: "center" }}
            >
              <CardView data={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}
