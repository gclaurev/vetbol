import React, {useEffect} from 'react';
import {View} from 'react-native';

import auth from '@react-native-firebase/auth';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

async function onAppleButtonPress() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    requestedScopes: [
      AppleAuthRequestScope.EMAIL,
      AppleAuthRequestScope.FULL_NAME,
    ],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
}

export default function ApppleSignIn() {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() => onAppleButtonPress()}
    />
  );
}

// function App1() {
//   useEffect(() => {
//     // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
//     return appleAuth.onCredentialRevoked(async () => {
//       console.warn(
//         'If this function executes, User Credentials have been Revoked',
//       );
//     });
//   }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

//   return (
//     <View>
//       <AppleButton onPress={() => onAppleButtonPress()} />
//     </View>
//   );
// }

// async function onLogout() {
//   // performs logout request
//   const appleAuthRequestResponse = await appleAuth.performRequest({
//     requestedOperation: AppleAuthRequestOperation.LOGOUT,
//   });

//   // get current authentication state for user
//   const credentialState = await appleAuth.getCredentialStateForUser(
//     appleAuthRequestResponse.user,

//   // use credentialState response to ensure the user credential's have been revoked
//   if (credentialState === AppleAuthCredentialState.REVOKED) {
//     // user is unauthenticated
//   }
// }

// function App3() {
//   return (
//     <View>
//       <Button onPress={() => onLogout()}>log out</Button>
//     </View>
//   );
// }
