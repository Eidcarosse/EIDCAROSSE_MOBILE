import React from "react";
import { View } from "react-native";
import { Head, ScreenWrapper } from "../../../components";
import Dropdowndetail from "../../../components/Dropdowndetail";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function FAQ({ navigation, route }) {
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"FAQ"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primery}
      backgroundColor="white"
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <Dropdowndetail
          title={"How do I post an ad?"}
          detail={
            "You can easily post your ad; Just tap on the the plus (+) icon & then login and submit your ad with proper data. You will get a notification after submitting your ad."
          }
        />
        <Dropdowndetail
          title={"How do I edit/delete my ads?"}
          detail={
            "Simply login and go to Account => my listing & you will get a list of your ads. Each ad has delete option"
          }
        />
        <Dropdowndetail
          title={"How to edit my ad?"}
          detail={
            "Simply login and go to Account => my listing & you will get a list of your ads. Each ad has edit option"
          }
        />
        <Dropdowndetail
          title={"How many days my ads will remain active?"}
          detail={
            "It depends on your settings how many days the listing will active depends on it ads will be visible "
          }
        />
        <Dropdowndetail
          title={"How many ads can I post for free?"}
          detail={
            "It depends on your settings on website seller will get no of free ads to post for certain no of days."
          }
        />
        <Dropdowndetail
          title={"How can I edit my account information?"}
          detail={
            "Login then go to my account, you will get your account information edit option"
          }
        />
        <Dropdowndetail
          title={"How to start chat with someone?"}
          detail={
            "Go to detail of an ad; you will get email, phone and chat option. Just tap the chat icon and start your conversation."
          }
        />
        <Dropdowndetail
          title={"Will I get chat notifications as a Seller?"}
          detail={
            "Yes. For chat request or email, seller will get an email notification. For chat, buyer will get first initial message as email notification."
          }
        />
      </View>
    </ScreenWrapper>
  );
}
