import React from 'react';
import {
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from '../../styling/vetBolStyles';

export default function Wholesales() {
  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Buenas, deseo registrame como distribuidor mayorista&phone=+59170380258',
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>
          Quiero registrarme como distribuidor mayorista de alimento y medicinas 
        </Text>
        <TouchableOpacity
          style={styles.itemOverlayWhatsApp}
          onPress={sendWhatsApp}>
          <Text style={styles.itemOverlayWhatsAppLabel}>💬 70380258 💬</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
