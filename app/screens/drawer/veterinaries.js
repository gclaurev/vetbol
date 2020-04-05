import React from 'react';
import {
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from '../../styling/vetBolStyles';

export default function Veterinaries() {
  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Buenas, deseo registrar mi veterinaria&phone=+59170380258',
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>
          Quiero registrar mi veterinaria para servicios de emergencia
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
