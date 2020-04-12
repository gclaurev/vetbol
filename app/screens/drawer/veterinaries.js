import React from 'react';
import {
  ImageBackground,
  Linking,
  SafeAreaView,
  Image,
  View,
} from 'react-native';
import MapView, {PROVIDER} from 'react-native-maps';

import styles from '../../styling/vetBolStyles';

export default function Veterinaries() {
  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Buenas, deseo registrar mi veterinaria&phone=+59170380258',
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={{width: '100%', height: '100%'}}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerImageContainer}>
          <Image
            source={require('../../assets/drawer/vets.png')}
            style={styles.headerImage}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <MapView
            style={{height: '90%', width: '95%'}}
            region={{
              //Home
              latitude: -17.736334,
              longitude: -63.18008,
              // Cocha
              // latitude: -17.377198,
              // longitude: -66.150855,
              latitudeDelta: 0.025,
              longitudeDelta: 0.025,
            }}
            zoomEnabled={true}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
