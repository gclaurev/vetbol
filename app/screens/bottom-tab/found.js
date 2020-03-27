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

import {getKey, storeOne} from '../../services/database';

import styles from '../../styling/vetBolStyles';

import ImagePicker from 'react-native-image-picker';

export default function Found() {
  async function storeItem() {
    const id = getKey();
    const item1 = 'item1';
    const toStore = {
      item1,
      item2: 'item2',
      item3: 'item3',
      item4: 'item4' + Math.random(),
    };
    storeOne(id, 'lost', toStore);
  }

  //Image picker
  const [avatarSource, setAvatarSource] = useState(false);

  const selectPhotoTapped = () => {
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
        <Button title="New items" onPress={storeItem} />
        <TouchableOpacity
          style={styles.pictureContainer}
          onPress={selectPhotoTapped}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 5}]}>
            {avatarSource === false ? (
              <Text style={styles.overlayDateButtonTitle}>
                Click para subir foto
              </Text>
            ) : (
              <Image style={styles.avatar} source={avatarSource} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
