import React from 'react';
import {
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from '../../styling/vetBolStyles';

export default function Home() {
  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Encontré a su peludito&phone=+59170380258',
    );
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          style={styles.itemOverlayWhatsApp}
          onPress={sendWhatsApp}>
          <Text style={styles.itemOverlayWhatsAppLabel}>💬 70380258 💬</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
