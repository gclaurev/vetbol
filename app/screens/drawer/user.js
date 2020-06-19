import React from 'react';
import {
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
  View,
  Platform,
} from 'react-native';

import AppleSignIn from '../../services/login/apple';
import FacebookSignIn from '../../services/login/facebook';
import styles from '../../styling/vetBolStyles';

export default function Users() {
  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Buenas, deseo registrarme como usuario&phone=+59170380258',
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Quiero registrarme como usuario</Text>
        <TouchableOpacity
          style={styles.itemOverlayWhatsApp}
          onPress={sendWhatsApp}>
          <Text style={styles.itemOverlayWhatsAppLabel}>💬 70380258 💬</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View>{Platform.OS === 'ios' && <AppleSignIn />}</View>
        <View>
          <FacebookSignIn />
        </View>
      </View>
    </SafeAreaView>
  );
}
