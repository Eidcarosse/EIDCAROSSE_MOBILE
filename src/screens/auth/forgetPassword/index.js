import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Icons from "../../../asset/images";
import Modal from "react-native-modal";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import AppColors from "../../../utills/AppColors";
import { height, width } from "../../../utills/Dimension";
import styles from "./styles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { verifyCodeAPI, forgetPasswordAPI } from "../../../backend/auth";
import { errorMessage, successMessage } from "../../../utills/Methods";
import ScreenNames from "../../../routes/routes";
//import i18n from "../../../translation";
export default function ForgetPassword({ navigation, route }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [modal, setModel] = useState(false);
  const [token, setToken] = useState("");

  async function forgetpassword() {
    const d = await forgetPasswordAPI(email);
    if (d?.success) {
      setToken(d?.data);
      successMessage(t(`flashmsg.emailsussesssendmsg`),t(`flashmsg.success`));
      setTimeout(() => setModel(true), 600);
    } else errorMessage(d?.message, t(`flashmsg.authentication`));
  }
  async function checkPassword(code) {
    const d = await verifyCodeAPI(code);
    if (d?.success) {
      setModel(false);
      setToken("");
      navigation.navigate(ScreenNames.CPF, { token, email });
    } else {
      errorMessage(t(`flashmsg.wrongpinerrormsg`),t(`flashmsg.error`));
    }
  }
  return (
    <ScreenWrapper
      statusBarColor={AppColors.primary}
      barStyle="light-content"
      headerUnScrollable={() => <Head navigation={navigation} />}
    >
      <View style={styles.mainViewContainer}>
        <ImageBackground source={Icons.bglogo} style={styles.bg}>
          <View style={styles.imageiner}>
            <Text style={styles.logintext}>{t("frogeyPassword.title")}</Text>
          </View>
        </ImageBackground>
        <View style={{ paddingTop: width(10) }}>
          <Input
            value={email}
            setvalue={setEmail}
            title={"login.emailTitle"}
            placeholder={"login.yourEmailAddress"}
          />
          <Button
            disabled={token ? true : false}
            containerStyle={styles.button}
            title={"frogeyPassword.button"}
            onPress={() => {
              if (email) {
                forgetpassword();
              } else {
                errorMessage(t(`flashmsg.emailrequireerrormsg`),t(`flashmsg.error`));
              }
            }}
          />
        </View>
      </View>
      <Modal isVisible={modal} backdropOpacity={0.2}>
        <View
          style={{
            backgroundColor: AppColors.white,
            height: height(40),
            width: width(90),
            borderRadius: width(5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[30, 15, 10, 0]}
            size={100}
          >
            {({ remainingTime }) => {
              if (remainingTime == 0) {
                setModel(false);
                setToken("");
              }
              return (
                <Text style={{ fontSize: width(5) }}>{remainingTime}</Text>
              );
            }}
          </CountdownCircleTimer>
          <View style={{ paddingTop: width(10) }}>
            <Input
              value={code}
              setvalue={setCode}
              placeholder={"Enter Code"}
              containerStyle={{
                width: width(60),
                borderWidth: width(0.2),
                borderRadius: width(5),
              }}
            />
            <Button
              containerStyle={{ width: width(60), margin: width(3) }}
              title={"Verify"}
              onPress={() => {
                if (code) {
                  checkPassword(code);
                } else {
                  errorMessage(t(`flashmsg.entercode`),t(`flashmsg.error`));
                }
                //setModel(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
