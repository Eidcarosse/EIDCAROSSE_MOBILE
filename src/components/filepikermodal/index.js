import React, {forwardRef, useImperativeHandle, useState} from 'react';
//import ImagePicker from 'react-native-image-crop-picker';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

import DropDownMenu from '../dorpdownmenu';

const FilePickerModal = ({onFilesSelected}, ref) => {
  const [isVisible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: function () {
      setVisible(true);
    },
    hide: function () {
      setVisible(false);
    },
    cleanTempImages: () => {

      // ImagePicker.cleanTempImages()
      //   .then(() => {
      //     console.log('removed all tmp images from tmp directory');
      //   })
      //   .catch(console.log);
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
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
      });
    
      if (!result.cancelled) {
        setSelectedImages([...selectedImages, result.uri]);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };
  const openGallery = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    }).then((a)=>onFilesSelected(a.assets)).catch((e)=>console.log("my log",e))
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