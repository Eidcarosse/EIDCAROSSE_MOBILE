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
import { FontAwesome } from "@expo/vector-icons";

import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import { selectUserMeta, setUserMeta } from "../../../redux/slices/user";
import { setAppLoader } from "../../../redux/slices/config";
import { updateProfile } from "../../../backend/auth";
import { errorMessage } from "../../../utills/Methods";

export default function EditProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const userdata = useSelector(selectUserMeta);
  const imageRef = useRef(null);
  const [image, setImage] = React.useState([userdata?.image]);
  const [firstName, setFirstName] = React.useState(userdata?.firstName || null);
  const [lastName, setLastName] = React.useState(userdata?.lastName || null);

  const [userName, setUserName] = React.useState(userdata?.userName || null);
  const [email, setEmail] = React.useState(userdata?.email || null);
  const [phoneNumber, setPhoneNumber] = React.useState(
    userdata?.phoneNumber || null
  );

  const update = async () => {
    try {
      dispatch(setAppLoader(true));
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);

      formData.append("file", {
        name: `image`,
        type: "image/jpeg", // Adjust the type if needed
        uri: image[0],
      });

      console.log(formData);

      let d = await updateProfile(userdata?._id, formData);
      if (d) {
        dispatch(setUserMeta(d)), navigation.goBack();
      } else {
        errorMessage("Not update");
      }
      dispatch(setAppLoader(false));
    } catch (error) {
      console.error("update", error);
      dispatch(setAppLoader(false));
    }
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head headtitle={"editprofile.headtitle"} navigation={navigation} />
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
                <Image style={styles.avatar} source={{ uri: image[0] }} />
                <View
                  style={{
                    position: "absolute",
                    top: height(12),
                    left: width(29),
                    backgroundColor: AppColors.primary,
                    padding: width(2),
                    borderRadius: width(5),
                  }}
                >
                  <FontAwesome
                    name="camera"
                    size={width(5)}
                    color={AppColors.white}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ paddingLeft: width(5) }}>
                <Text
                  style={{
                    fontSize: width(5),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.email}
                </Text>

                <Text
                  style={{
                    fontSize: width(3),
                    fontWeight: "bold",
                    color: AppColors.white,
                  }}
                >
                  {userdata?.userName}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{ paddingVertical: width(10) }}>
          <Input
            title={"editprofile.firstNameTitle"}
            placeholder={"editprofile.firstNamePlaceholder"}
            value={firstName}
            setvalue={setFirstName}
          />
          <Input
            title={"editprofile.lastNameTitle"}
            placeholder={"editprofile.lastNamePlaceholder"}
            value={lastName}
            setvalue={setLastName}
          />
          <Input
            title={"editprofile.userNameTitle"}
            placeholder={"editprofile.usernamePlaceholder"}
            value={userName}
            setvalue={setUserName}
            editable={false}
          />
          <Input
            title={"editprofile.emailTitle"}
            placeholder={"editprofile.emailPlaceholder"}
            value={email}
            setvalue={setEmail}
            editable={false}
          />
          <Input
            title={"editprofile.phoneNumberTitle"}
            placeholder={"editprofile.phoneNumberPlaceholder"}
            value={phoneNumber}
            setvalue={setPhoneNumber}
          />
          <Button
            containerStyle={styles.button}
            onPress={update}
            title={"editprofile.update"}
          />
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
