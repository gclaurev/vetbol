import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  PixelRatio,
  Image,
} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../../styling/vetBolStyles';
import { colors } from '../../styling/colors';

//Date Picker
import DateTimePicker from '@react-native-community/datetimepicker';

//Image picker
import ImagePicker from 'react-native-image-picker';

export default function Lost(props) {
  //overlay
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(prevState => !prevState);
  }
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
    setShow(!show);
  };

  //Image picker
  const [avatarSource, setAvatarSource] = useState(false);

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
  
  
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      setAvatarSource(source);
    }
  });
};

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
          <ScrollView>
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
          <Text style={styles.overlayLabel}>WhatsApp:</Text>
          <TextInput
            style={styles.overlayTextInput}
            selectionColor={colors.brown}
            placeholder="60977768"
          />
          <Text style={styles.overlayLabel}>Dirección:</Text>
          <TextInput
            style={styles.overlayTextInput}
            selectionColor={colors.brown}
            placeholder="Av. Beni esq. 4to anillo..."
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

<TouchableOpacity style={styled.container} onPress={selectPhotoTapped}>
          <View
            style={[styled.avatar, styled.avatarContainer, {marginBottom: 20}]}>
            
            {avatarSource === false ? (
              <Text>Click para subir foto</Text>
            ):(
              <Image style={styled.avatar} source={avatarSource} />
            )}
          </View>
        </TouchableOpacity>
        </ScrollView>
        <View>
            <Button
              buttonStyle={styles.overlayDateButton}
              titleStyle={styles.overlayDateButtonTitle}
              onPress={toggle}
              title="Finalizar registro"
            />
          </View>

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

const styled = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});