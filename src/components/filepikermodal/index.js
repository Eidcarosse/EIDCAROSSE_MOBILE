import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
//import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import DropDownMenu from "../dorpdownmenu";

const FilePickerModal = ({ onFilesSelected, multi=false}, ref) => {
  const [isVisible, setVisible] = useState(false);

  const requestPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      alert("Permission to access camera or camera roll denied!");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);
  useImperativeHandle(ref, () => ({
    show: function () {
      setVisible(true);
    },
    hide: function () {
      setVisible(false);
    },
    cleanTempImages: () => {
      ImagePicker.cleanTempImages()
        .then(() => {
          console.log('removed all tmp images from tmp directory');
        })
        .catch(console.log);
    },
  }));
  // async function openCamera() {
  //  await launchCamera({

  //     mediaType: 'photo',
  //     multiple:true,
  //     height: 400,
  //     width: 400,
  //   }).then(onFilesSelected);
  // }
  // async function openGallery() {
  //   try {
  //     await launchImageLibrary({

  //       mediaType: 'photo',
  //       multiple:true,
  //       height: 400,
  //       width: 400,
  //     }).then(onFilesSelected);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }
  const openCamera = async () => {
    try {
      let result = await launchCamera({})
        .then((a) => onFilesSelected(a.assets))
        .catch((e) => console.log("my log", e));
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };
  const openGallery = async () => {
    await ImagePicker.launchImageLibrary({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multi,
      selectionLimit:5
    })
      .then((a) => onFilesSelected(a.assets))
      .catch((e) => console.log("my log", e));
  };

  function openPicker(type = 0) {
    setVisible(false);
    setTimeout(type == 0 ? openCamera : openGallery, 400);
  }
  return (
    <DropDownMenu
      isVisible={isVisible}
      firstBtnText="Take Photo"
      secondBtnText="Choose from Library"
      onPressFirstBtn={() => openPicker(0)}
      onPressSecondBtn={() => openPicker(1)}
      onClose={() => setVisible(false)}
    />
  );
};
export default forwardRef(FilePickerModal);
