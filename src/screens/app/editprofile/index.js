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
  const [image, setImage] = React.useState([userdata?.image]);
  const [firstName, setFirstName] = React.useState(userdata?.firstName ||null);
  const [lastName, setLastName] = React.useState(userdata?.lastName ||null);

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
                  source={{ uri: image[0] }}
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
            title={"First Name"}
            placeholder={"Enter Name"}
            value={firstName}
            setvalue={setFirstName}
          />
          <Input
            title={"Last Name"}
            placeholder={"Enter Name"}
            value={lastName}
            setvalue={setLastName}
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
          const selectedImages = img.map((imageUri) => {
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
