import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

async function onFacebookButtonPress() {
  
  console.log('get in1');

  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  console.log('get in2');

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  console.log('get in3');
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  console.log('get in4');
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  console.log('get in5');

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  console.log('get in6');
  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

export default function FacebookSignIn() {
  return (
    <Button
      title="Facebook Sign-In"
      onPress={() =>
        onFacebookButtonPress().then(() =>
          console.log('Signed in with Facebook!'),
        )
      }
    />
  );
}
