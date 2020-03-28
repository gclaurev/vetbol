import React, {useState} from 'react';
import {firebase} from '@react-native-firebase/storage';

export async function uploadImage(imageName, image) {
  var url = false;

  if (image.uri) {
    try {
      const fileExtension = image.uri.split('.').pop();
      console.log('1fileExtension: ' + fileExtension);

      const fileName = `${imageName}.${fileExtension}`;
      console.log('2fileName: ', fileName);

      // var storageRef = firebase
      //   .storage()
      //   .ref(`lost/${fileName}`);
      //   // .refFromURL(`gs://veterinarias-bolivia.appspot.com/lost/${fileName}`);
      // console.log('3storageRef: ', storageRef);

      // console.log('4image.path: ', image.path);
      // const task = storageRef.putFile(decodeURI(image.uri), {
      //   cacheControl: 'no-store', // disable caching
      // });
      // console.log('5.1 task', task);
      // url = await storageRef.getDownloadURL();
      // console.log('5.2 url', url);

      const uri =
        Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
      const imageRef = firebase
        .storage()
        .ref('images/')
        .child('blah');
      await imageRef.putFile(uri);
      const imageUrl = await imageRef.getDownloadURL();
      console.log('3 imageUrl: ', imageUrl);

      
    } catch (error) {
      console.log('6error: ', error);
    }
    return url;
  }
}
