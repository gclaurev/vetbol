import React, {useState} from 'react';
import {Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default function FacebookSignIn() {
  const [token, setToken] = useState(false);

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    setToken(data.accessToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function loging() {
    AccessToken.getCurrentAccessToken().then(data => {
      let accessToken = data.accessToken;
      alert(accessToken.toString());

      const responseInfoCallback = (error, result) => {
        if (error) {
          console.log(error);
          alert('Error fetching data: ' + error.toString());
        } else {
          console.log(result);

          // Here's my code
          alert(
            'Success fetching data: ' +
              result.name.toString() +
              ', ' +
              result.email.toString(),
          );
          /*
            if(your DB already got this email or something unique) {
              // SignIn()
            }
            // when your DB doesn't have this email
            else {
              // Do signUp() with this infomation and SignIn()
            }
            */
        }
      };

      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name',
            },
          },
        },
        responseInfoCallback,
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  return (
    <View>
      <Button
        title="Facebook Sign-In"
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }
      />
      <Button
        title="Facebook Log Out"
        onPress={() =>
          loging().then(() => console.log('Signed in with Facebook!'))
        }
      />
    </View>
  );
}
