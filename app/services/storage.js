import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';

export function uploadImage(imageName, image) {
  const url = false;
  console.log('url', url);
  console.log('url', image);
  console.log('url', image.uri);

  if (image.uri) {
    const fileExtension = image.uri.split('.').pop();
    console.log('EXT: ' + fileExtension);

    const fileName = `${imageName}.${fileExtension}`;
    console.log(fileName);

    var storageRef = storage.ref(`lost/${fileName}`);

    storageRef.putFile(image.uri).on(
      storage.TaskEvent.STATE_CHANGED,
      () => {},
      error => {},
      () => {
        storageRef.getDownloadURL().then(downloadUrl => {
          this.url = downloadUrl;
        });
      },
    );
    return url;
  }
}
