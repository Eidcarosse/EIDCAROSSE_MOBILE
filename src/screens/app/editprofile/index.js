import React, { useRef } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import Icons from "../../../asset/images";
import {
  Button,
  FilePickerModal,
  Head,
  Input,
  ScreenWrapper,
} from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import { selectUserMeta } from "../../../redux/slices/user";

export default function EditProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const userdata = useSelector(selectUserMeta);
  const imageRef = useRef(null);
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState(userdata?.name ||null);
  const [userName, setUserName] = React.useState(userdata?.userName ||null);
  const [email, setEmail] = React.useState(userdata?.email ||null);
  const [phoneNumber, setPhoneNumber] = React.useState(userdata?.phoneNumber ||null);

const update=()=>{

}

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"Edit Profile"} navigation={navigation} />
      )}
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      scrollEnabled
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground
          source={Icons.bglogo}
          style={{ width: width(100), height: height(28) }}
        >
          <View style={styles.imageiner}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => imageRef.current.show()}>
                <Image
                  style={styles.avatar}
                  source={image == "" ? Icons.car : { uri: image[0] }}
                />
              </TouchableOpacity>
              <View style={{ paddingLeft: width(5) }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  Usama Khan
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  usamakhan@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input
            title={"Name"}
            placeholder={"Enter Name"}
            value={name}
            setvalue={setName}
          />
          <Input
            title={"User Name"}
            placeholder={"Enter Username"}
            value={userName}
            setvalue={setUserName}
          />
          <Input
            title={"Email"}
            placeholder={"Enter Email"}
            value={email}
            setvalue={setEmail}
          />
          <Input
            title={"Phone Number"}
            placeholder={"Phone Number"}
            value={phoneNumber}
            setvalue={setPhoneNumber}
          />
          <Button containerStyle={styles.button} title={"Save Change"} />
        </View>
      </View>
      <FilePickerModal
        ref={imageRef}
        onFilesSelected={(img) => {
        //  console.log("imggggg", img);
          const selectedImages = img.map((imageUri) => {
           // console.log(image.length);
         //   if (image.length < 5) {
              return Platform.OS === "android"
                ? imageUri.uri
                : imageUri.uri.replace("file://", "");
           //}
          });
          setImage(selectedImages);
        }}
      />
    </ScreenWrapper>
  );
}
