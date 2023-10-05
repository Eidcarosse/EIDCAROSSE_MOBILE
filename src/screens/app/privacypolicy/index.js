import React from "react";
import { Image, Text, View } from "react-native";
import Icons from "../../../asset/images";
import { Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function PP({ navigation, route }) {
  const data = [
    {
      paraTitle: "",
      paraDetail:
        "Eidcarosse mobile application creators – prioritizes and values the security and privacy of the information you share with us through our Eidcarosse. We intend to make our users as comfortable using our app as possible. If you are to trust us with your information, you must understand how we collect, use, and maintain it.\n\nWhen you are about to acquire Eidcarosse, you'll need to register with us. The registration gives us your First and Last Name, Email Address and Phone Number.",
    },
    {
      paraTitle: "Information Collection and Use",
      paraDetail:
        "We may require you to provide us with certain personal information for a better experience. This information includes but is not limited to, name, address, and location data. This information will only be accessible to us and will only be used as described in this privacy policy.",
    },
    {
      paraTitle: "Personal Information:",
      paraDetail:
        "When you register and provide your name, phone number, email address, account username, and password, we will not retain your address information.",
    },
    {
      paraTitle: "For How Long is Personal Information Retained?",
      paraDetail:
        "When you register with us, your personal information and email are retained for the sake of future support. This information remains stored with us until you delete your personal information.",
    },
    {
      paraTitle: "What We Don't Do with Your Personal Information:",
      paraDetail:
        "We don't and will never disclose, share, or provide your private information with other companies to market their own services or products. It is also against our policy to share your personal information with unauthorized people.",
    },
    {
      paraTitle: "Your Rights Over Your Data:",
      paraDetail:
        "As a registered user, it is within your rights to edit your personal information. You can also request that a file of your information be exported. Upon logging into our site, you can delete your data too.",
    },
    {
      paraTitle: "Cookies",
      paraDetail:
        "Cookies are small files with little data that are often used for unique anonymous identification. The website you visit sends them to your browser and stores them on your device's internal memory.\n\nAlthough our app or service may not use cookies explicitly, it may utilize third-party coding that uses them to collect information and improve their services. You will know when cookies are being sent to your device and have the option to accept or refuse cookies. However, rejecting cookies may deter you from accessing some services.",
    },
    {
      paraTitle: "Our Security Procedures Against Data Breaches:",
      paraDetail:
        "We value the trust you've placed in us by giving us your personal information. Therefore, we employ industry-standard security means and technologies to protect your personal information from unauthorized disclosure, access, or use. Please don't disclose your registration password and username to unauthorized people to help us protect your privacy.\n\nEven though no internet transmission method or electronic storage procedure is 100% watertight. Eidcarosse leaves nothing to chance in efforts to protect your personal information.\n\nIn case your information is accessed by unauthorized people or is lost, we'll inform you as soon as we become aware of this.",
    },
    {
      paraTitle: "How to Access Your Data or Edit Your Personal Information:",
      paraDetail:
        "When you log in on our site with your details, all your account information will be available for you to edit or delete. If you want to stop email notifications for the Eidcarosse app, just unsubscribe or send us an email, and we'll erase your email or account. Ensure that your email's subject reads 'delete my username'.",
    },
    {
      paraTitle: "Contact Us",
      paraDetail:
        "If you have any suggestions or questions about our privacy policy, please feel free to contact us via kundendienst@eidcarosse.ch ",
    },
  ];
  const PPPara = ({ data }) => {
    return (
      <View style={styles.container}>
        {data?.paraTitle && <Text style={styles.title}>{data?.paraTitle}</Text>}
        <Text style={styles.content}>{data?.paraDetail}</Text>
      </View>
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Privacy Policy"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      backgroundColor={AppColors.white}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageview}>
          <Image source={Icons.pp} style={styles.image} />
        </View>
        {data.map((item, index) => (
          <PPPara key={index} data={item} />
        ))}
      </View>
    </ScreenWrapper>
  );
}
