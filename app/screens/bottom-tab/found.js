import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';

//Storing
import {storeOneForLists, getKey} from '../../services/database';

//Appearance
import styles from '../../styling/vetBolStyles';
import {colors} from '../../styling/colors';

//Date Picker
import DateTimePicker from '@react-native-community/datetimepicker';

//Image picker
import ImagePicker from 'react-native-image-picker';
export default function Found() {
  return (
    <SafeAreaView>
      <View>
        <Button title="New items" />
        <View>
          <Text>Click para subir foto</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
