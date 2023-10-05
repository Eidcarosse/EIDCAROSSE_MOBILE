import React from "react";
import { Image, Text, View } from "react-native";
import Icons from "../../../asset/images";
import { Head, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import styles from "./styles";

export default function TnC({ navigation, route }) {
  const data = [
    {
      paraTitle: "",
      paraData:
        "Before using the Eidcarosse mobile app service, it is essential that you carefully review and agree to the following Terms and Conditions. Your acceptance of these terms is required for utilizing the app. Make sure to go through the Terms & Conditions thoroughly prior to using the service.",
    },
    {
      paraTitle: "General",
      paraData:
        "Eidcarosse holds advertisers and users accountable for ensuring that all content, including images, videos, graphics, and text, uploaded to the platform complies with applicable laws. Any inaccuracies or legal issues arising from the posted content are not the responsibility of Eidcarosse. Both advertisers and users guarantee that their content does not infringe upon copyrights, intellectual property rights, or any other rights of any individual or entity. By using the service, the user or advertiser agrees to release Eidcarosse from any obligations, claims, or liabilities associated with the use or inability to use the platform. Additionally, advertisers consent to their content being displayed on partner sites of Eidcarosse, subject to the same terms and conditions as on Eidcarosse itself.",
    },
    {
      paraTitle: "Copyright",
      paraData:
        "Advertisers grant Eidcarosse a perpetual, irrevocable, royalty-free, non-exclusive license and the right to use, modify, reproduce, publish, adapt, translate, create derivative works from, distribute, or incorporate the provided content into any form, technology, or medium, whether presently known or developed in the future.",
    },
    {
      paraTitle: "Watermarks",
      paraData:
        "Eidcarosse applies watermarks to all images to prevent their unauthorized reuse for other purposes without the advertiser's explicit permission.",
    },
    {
      paraTitle: "Safety and Images",
      paraData:
        "Eidcarosse reserves the right to modify the titles of any content on the app for editorial purposes.",
    },
    {
      paraTitle: "Personal",
      paraData:
        "Eidcarosse reserves the right to cooperate with authorities in case any content on the app violates the law. The identity of users, buyers, or advertisers may be determined, for example, by an ISP. IP addresses may also be registered to ensure compliance with the terms and conditions.",
    },
    {
      paraTitle: "Privacy",
      paraData:
        "Eidcarosse will collect information from users, buyers, and advertisers. By using Eidcarosse, each user and advertiser consents to and authorizes the collection and use of this information. Eidcarosse also reserves the right to disclose the information to Company Affiliates and any other person for supporting, administering, and maintaining Eidcarosse, including marketing, research, planning, and product development.",
    },
    {
      paraTitle: "Cookies",
      paraData:
        "This app may use cookies, which require cookie-enabled devices. A cookie file contains information, such as a random user ID that the site automatically assigns to a visitor to track the pages they visit. Cookies cannot read data off your hard disk or identify the user.",
    },
    {
      paraTitle: "Email Address of Users",
      paraData:
        "Users are required to submit valid email addresses before they are allowed to post advertisement listings. The email addresses will not be displayed publicly. However, users are allowed to send emails to other users through Eidcarosse.",
    },
    {
      paraTitle: "Site Availability",
      paraData:
        "Eidcarosse does not guarantee uninterrupted or secure access to the app. The app is provided on an 'as is' and 'as and when available' basis.",
    },
    {
      paraTitle: "Links to Third-Party Websites",
      paraData:
        "Eidcarosse may contain references and links to other sites (Third-Party Websites). However, Eidcarosse shall not be responsible for the contents of these third-party websites. Third-party websites are not monitored or investigated by Eidcarosse. Once a user decides to leave Eidcarosse and access a third-party website, they do so at their own risk.",
    },
    {
      paraTitle: "Paid Content and Service",
      paraData:
        "Some services and content on Eidcarosse may require payment, including but not limited to membership packages and posting ads in specific categories. Users may buy ad promotions using vouchers sold or issued by Eidcarosse, but vouchers are not redeemable for cash. Advertisers and other users may be required to transmit information of their paid content via a third-party provider, which is governed by their own terms and conditions. Users and advertisers accept such links at their own risk, and Eidcarosse disclaims all liability related to them. Eidcarosse is not obliged to refund any payments made concerning paid content.",
    },
    {
      paraTitle: "Memberships",
      paraData:
        "Eidcarosse will create a shop on the user's behalf. The shop created will be devoid of content, pending the addition of the same by the user. Eidcarosse has the right to any content added to the shop by the user and has the right to remove or decline to publish content that it deems inappropriate or violates any aspects of the terms and conditions. Eidcarosse reserves the right to change or modify membership packages, including their price and contents. Eidcarosse is not obligated to refund services or money if a membership package is canceled early, for any reason whatsoever.",
    },
    {
      paraTitle: "Disclaimer",
      paraData:
        "Eidcarosse assumes no responsibility whatsoever for the use of Eidcarosse and disclaims all responsibility for any claim, injury, damage, or liability of any kind resulting from, arising out of, or in any way related to (a) any errors on Eidcarosse or the Content, including but not limited to typographical errors and technical errors, (b) any third-party websites or content directly or indirectly accessed or retrieved through links in Eidcarosse, (c) the unavailability of Eidcarosse, (d) your use of Eidcarosse or the Content, or (e) your use of any equipment (or software) in connection with Eidcarosse.",
    },
    {
      paraTitle: "Indemnification",
      paraData:
        "Advertisers and other users agree to indemnify Eidcarosse and its employees, agents, officers, directors, from and against all expenses, losses, damages, and costs, including attorney's fees, arising from any violation of these Terms and Conditions (including negligent or wrongful conduct).",
    },
    {
      paraTitle: "Modifications",
      paraData:
        "Eidcarosse reserves the right to alter or modify these Terms and Conditions. Such alterations or modifications shall be effective immediately upon posting on Eidcarosse. You are responsible for regularly reviewing for such modifications. Your continued access or use of Eidcarosse shall be deemed to be your acceptance of the modified terms and conditions.",
    },
    {
      paraTitle: "Governing Law",
      paraData:
        "Eidcarosse is operated under the laws and regulations of the respective country.",
    },
  ];
  const AboutPara = ({ data }) => {
    return (
      <View style={styles.container}>
        {data?.paraTitle && <Text style={styles.title}>{data?.paraTitle}</Text>}
        <Text style={styles.content}>{data?.paraData}</Text>
      </View>
    );
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Terms & Conditions"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      backgroundColor={AppColors.white}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <View style={styles.imageview}>
          <Image source={Icons.tnc} style={styles.image} />
        </View>
        {data.map((item, index) => (
          <AboutPara key={index} data={item} />
        ))}
      </View>
    </ScreenWrapper>
  );
}
