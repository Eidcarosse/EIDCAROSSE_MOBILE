import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount, verifycode } from "../../../backend/auth";
import { Button, Head, Input, ScreenWrapper } from "../../../components";
import { selectCurrentLanguage } from "../../../redux/slices/language";
import ScreenNames from "../../../routes/routes";
import { height, width } from "../../../utills/Dimension";
import { errorMessage, successMessage } from "../../../utills/Methods";
import styles from "./styles";
//import i18n from "../../../translation";
export default function Verify({ navigation, route }) {
  const { t } = useTranslation();
  const data = route?.params?.data;
  const dispatch = useDispatch();
  const lang = useSelector(selectCurrentLanguage);
  const [email, setEmail] = useState(data?.userDetails?.email);
  const [code, setCode] = useState("");
  const [modal, setModel] = useState(false);
  const [token1, setToken1] = useState(data?.token);

  useEffect(() => {
    // if (email) {
    //   setTimeout(() => {
    //     sendverifycode();
    //     setModel(true);
    //   }, 600);
    // }
    successMessage(t(`flashmsg.emailsussesssendmsg`), t(`flashmsg.success`));
    setTimeout(() => setModel(true), 1200);
  }, []);

  async function verifyfuntion(code) {
    const data = await verifyAccount({ code, email, token1 });
    if (data?.success) {
      setModel(false);
      successMessage("Verified login now", "Success");
      navigation.navigate(ScreenNames.LOGIN);
    } else {
      errorMessage("Invalid Code", t(`flashmsg.error`));
    }
  }
  async function sendverifycode() {
    const d = await verifycode({ email, lang });
    if (d?.success) {
      setToken1(d?.data);
      successMessage(t(`flashmsg.emailsussesssendmsg`), t(`flashmsg.success`));
      setTimeout(() => setModel(true), 600);
    } else errorMessage(d?.message, t(`flashmsg.authentication`));
  }
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Head navigation={navigation} headtitle={t("Verify Account")} />
      )}
      footerUnScrollable={() => (
        <Button
          disabled={token1 ? true : false}
          containerStyle={styles.button}
          title={"Resend"}
          onPress={() => {
            if (email) {
              sendverifycode(code);
            } else {
              errorMessage(
                t(`flashmsg.emailrequireerrormsg`),
                t(`flashmsg.error`)
              );
            }
          }}
        />
      )}
    >
      <View style={styles.mainViewContainer}>
        <View style={{ paddingTop: width(10) }}>
          <Input
            value={email}
            setvalue={setEmail}
            title={"login.emailTitle"}
            placeholder={"login.yourEmailAddress"}
          />
        </View>
      </View>
      <Modal isVisible={modal} backdropOpacity={0.1}>
        <View style={styles.counter}>
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
                setToken1("");
              }
              return (
                <Text style={{ fontSize: height(2.5) }}>{remainingTime}</Text>
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
                  verifyfuntion(code);
                } else {
                  errorMessage(t(`flashmsg.entercode`), t(`flashmsg.error`));
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
