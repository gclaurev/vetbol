import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {uploadImage} from '../../services/storage';
import {getKey, storeOne} from '../../services/database';

import styles from '../../styling/vetBolStyles';

import ImagePicker from 'react-native-image-picker';

export default function Adpot() {
  //Image picker
  const [avatarSource, setAvatarSource] = useState(false);

  const saveImage = () => {
    uploadImage('el name', avatarSource);
  };

  const selectPhotoTapped2 = () => {
    console.log('tapped');
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setAvatarSource(source);
      }
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Button title="press me n" onPress={selectPhotoTapped2} />
        <Button title="print" onPress={saveImage} />
      </View>
    </SafeAreaView>
  );
}
