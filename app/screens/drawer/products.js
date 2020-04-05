import React from 'react';
import {
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import styles from '../../styling/vetBolStyles';

export default function Products() {
  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Buenas, necesito Nexgard a domicilio&phone=+59170380258',
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Necesito un producto</Text>
        <TouchableOpacity
          style={styles.itemOverlayWhatsApp}
          onPress={sendWhatsApp}>
          <Text style={styles.itemOverlayWhatsAppLabel}>💬 70380258 💬</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
