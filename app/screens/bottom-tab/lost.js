import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../../styling/vetBolStyles';
import { colors } from '../../styling/colors';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function Lost(props) {
  //overlay
  const [visible, setVisible] = useState(false);

  // datepicker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
    console.log(date);
  };

  const showMode = () => {
    setShow(true);
  };

  function toggle() {
    setVisible(prevState => !prevState);
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <Overlay isVisible={visible}>
        <View style={styles.container}>
          <Text style={styles.overlayTitle}>NUEVO PERDIDO (X)</Text>
          <TouchableOpacity
            style={styles.closeOverlay}
            onPress={toggle}
            onBackdropPress={toggle}>
            <Text style={styles.closeButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.overlayLabel}>Nombre del peludito:</Text>
          <TextInput
            style={styles.overlayTextInput}
            selectionColor={colors.brown}
            placeholder="Anvorgesito"
          />
          <Text style={styles.overlayLabel}>Descripción:</Text>
          <TextInput
            style={styles.overlayTextInput}
            selectionColor={colors.brown}
            placeholder="Negro con cola blanca"
          />
          <Text style={styles.overlayLabel}>Fecha:</Text>
          <View>
            <Button
              buttonStyle={styles.overlayDateButton}
              titleStyle={styles.overlayDateButtonTitle}
              onPress={showMode}
              title="Seleccionar Fecha"
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </Overlay>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggle}
          onBackdropPress={toggle}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
