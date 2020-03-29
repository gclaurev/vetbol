import Platform from 'react-native';
import {firebase} from '@react-native-firebase/storage';

export async function uploadImage(type, imageName, image) {
  var imageUrl = false;

  if (image.uri) {
    try {
      const fileExtension = image.uri.split('.').pop();
      const fileName = `${imageName}.${fileExtension}`;

      const uri =
        Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
      const imageRef = firebase
        .storage()
        .ref(`${type}/`)
        .child(fileName);
      await imageRef.putFile(uri);
      imageUrl = await imageRef.getDownloadURL();
    } catch (error) {
      console.log('error: ', error);
    }
    return imageUrl;
  }
}
