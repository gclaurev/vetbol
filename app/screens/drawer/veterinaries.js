import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {Button, CheckBox, Overlay} from 'react-native-elements';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import styles from '../../styling/vetBolStyles';
import {colors} from '../../styling/colors';

//Util
import database from '@react-native-firebase/database';
import {getKey, storeOneForLists} from '../../services/database';
import {requestLocationPermission} from '../../services/location';
//Image picker
import ImagePicker from 'react-native-image-picker';

export default function Veterinaries() {
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
    const ref = database().ref('vet');
    // ref.once('value', fillList);
  }, []);

  //Form
  const [name, setName] = useState(false);
  // Cocha
  // latitude: -17.377198,
  // longitude: -66.150855,
  const [latitude, setLatitude] = useState(-17.736334);
  const [longitude, setLongitude] = useState(-63.18008);
  //services
  const [ambulance, setAmbulance] = useState(false);
  function toggleAmbulance() {
    setAmbulance(prevState => !prevState);
  }
  const [castration, setCastration] = useState(false);
  function toggleCastration() {
    setCastration(prevState => !prevState);
  }
  const [deworming, setDeworming] = useState(false);
  function toggleDeworming() {
    setDeworming(prevState => !prevState);
  }
  const [ecography, setEcography] = useState(false);
  function toggleEcography() {
    setEcography(prevState => !prevState);
  }
  const [emergency, setEmergency] = useState(false);
  function toggleEmergency() {
    setEmergency(prevState => !prevState);
  }
  const [fumigation, setFumigation] = useState(false);
  function toggleFumigation() {
    setFumigation(prevState => !prevState);
  }
  const [hairdressing, setHairdressing] = useState(false);
  function toggleHairdressing() {
    setHairdressing(prevState => !prevState);
  }
  const [home, setHome] = useState(false);
  function toggleHome() {
    setHome(prevState => !prevState);
  }
  const [surgery, setSurgery] = useState(false);
  function toggleSurgery() {
    setSurgery(prevState => !prevState);
  }
  const [vaccination, setVaccination] = useState(false);
  function toggleVaccination() {
    setVaccination(prevState => !prevState);
  }
  const [whatsAppVet, setWhatsAppVet] = useState(false);
  function toggleWhatsAppVet() {
    setWhatsAppVet(prevState => !prevState);
  }
  const [xRay, setXRay] = useState(false);
  function toggleXRay() {
    setXRay(prevState => !prevState);
  }
  //days
  const [mondayStartOne, setMondayStartOne] = useState(false);
  const [mondayEndOne, setMondayEndOne] = useState(false);
  const [mondayStartTwo, setMondayStartTwo] = useState(false);
  const [mondayEndTwo, setMondayEndTwo] = useState(false);
  const [tuesdayStartOne, setTuesdayStartOne] = useState(false);
  const [tuesdayEndOne, setTuesdayEndOne] = useState(false);
  const [tuesdayStartTwo, setTuesdayStartTwo] = useState(false);
  const [tuesdayEndTwo, setTuesdayEndTwo] = useState(false);
  const [wednesdayStartOne, setWednesdayStartOne] = useState(false);
  const [wednesdayEndOne, setWednesdayEndOne] = useState(false);
  const [wednesdayStartTwo, setWednesdayStartTwo] = useState(false);
  const [wednesdayEndTwo, setWednesdayEndTwo] = useState(false);
  const [thursdayStartOne, setThursdayStartOne] = useState(false);
  const [thursdayEndOne, setThursdayEndOne] = useState(false);
  const [thursdayStartTwo, setThursdayStartTwo] = useState(false);
  const [thursdayEndTwo, setThursdayEndTwo] = useState(false);
  const [fridayStartOne, setFridayStartOne] = useState(false);
  const [fridayEndOne, setFridayEndOne] = useState(false);
  const [fridayStartTwo, setFridayStartTwo] = useState(false);
  const [fridayEndTwo, setFridayEndTwo] = useState(false);
  const [saturdayStartOne, setSaturdayStartOne] = useState(false);
  const [saturdayEndOne, setSaturdayEndOne] = useState(false);
  const [saturdayStartTwo, setSaturdayStartTwo] = useState(false);
  const [saturdayEndTwo, setSaturdayEndTwo] = useState(false);
  const [sundayStartOne, setSundayStartOne] = useState(false);
  const [sundayEndOne, setSundayEndOne] = useState(false);
  const [sundayStartTwo, setSundayStartTwo] = useState(false);
  const [sundayEndTwo, setSundayEndTwo] = useState(false);
  //services
  const [whatsApp, setWhatsApp] = useState(false);

  //overlay
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(prevState => !prevState);
  }

  //Item Overlay
  const [itemVisible, setItemVisible] = useState(false);
  const [imageUrl, setItemImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/veterinarias-bolivia.appspot.com/o/vet%2FDra.%20Gabriela%20Morillo70380258.jpg?alt=media&token=9e8d1e1e-76e9-4c23-b04f-8c1140c7e060',
  );
  const [itemName, setItemName] = useState(false);
  const [itemDesc, setItemDesc] = useState(false);
  const [itemWhatsApp, setItemWhatsApp] = useState(false);
  const [itemAddress, setItemAddress] = useState(false);
  const [itemLost, setItemLost] = useState(false);

  function overlayItem(item) {
    setItemName(item.name);
    setItemImage(item.imageUrl);
    setItemDesc(item.desc);
    setItemWhatsApp(item.whatsApp);
    setItemAddress(item.address);
    setItemLost(item.lost);
    setItemVisible(true);
  }

  //Image picker
  const [image, setImage] = useState(false);
  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setImage(source);
      }
    });
  };

  function finish() {
    const id = getKey();
    var vet = {
      name,
      latitude,
      longitude,
      whatsApp,
      ambulance,
      castration,
      deworming,
      ecography,
      emergency,
      fumigation,
      hairdressing,
      home,
      surgery,
      vaccination,
      whatsAppVet,
      xRay,
    };
    if (mondayStartOne) {
      vet.mondayStartOne = mondayStartOne;
    }
    if (mondayEndOne) {
      vet.mondayEndOne = mondayEndOne;
    }
    if (mondayStartTwo) {
      vet.mondayStartTwo = mondayStartTwo;
    }
    if (mondayEndTwo) {
      vet.mondayEndTwo = mondayEndTwo;
    }
    if (tuesdayStartOne) {
      vet.tuesdayStartOne = tuesdayStartOne;
    }
    if (tuesdayEndOne) {
      vet.tuesdayEndOne = tuesdayEndOne;
    }
    if (tuesdayStartTwo) {
      vet.tuesdayStartTwo = tuesdayStartTwo;
    }
    if (tuesdayEndTwo) {
      vet.tuesdayEndTwo = tuesdayEndTwo;
    }
    if (wednesdayStartOne) {
      vet.wednesdayStartOne = wednesdayStartOne;
    }
    if (wednesdayEndOne) {
      vet.wednesdayEndOne = wednesdayEndOne;
    }
    if (wednesdayStartTwo) {
      vet.wednesdayStartTwo = wednesdayStartTwo;
    }
    if (wednesdayEndTwo) {
      vet.wednesdayEndTwo = wednesdayEndTwo;
    }
    if (thursdayStartOne) {
      vet.thursdayStartOne = thursdayStartOne;
    }
    if (thursdayEndOne) {
      vet.thursdayEndOne = thursdayEndOne;
    }
    if (thursdayStartTwo) {
      vet.thursdayStartTwo = thursdayStartTwo;
    }
    if (thursdayEndTwo) {
      vet.thursdayEndTwo = thursdayEndTwo;
    }
    if (fridayStartOne) {
      vet.fridayStartOne = fridayStartOne;
    }
    if (fridayEndOne) {
      vet.fridayEndOne = fridayEndOne;
    }
    if (fridayStartTwo) {
      vet.fridayStartTwo = fridayStartTwo;
    }
    if (fridayEndTwo) {
      vet.fridayEndTwo = fridayEndTwo;
    }
    if (saturdayStartOne) {
      vet.saturdayStartOne = saturdayStartOne;
    }
    if (saturdayEndOne) {
      vet.saturdayEndOne = saturdayEndOne;
    }
    if (saturdayStartTwo) {
      vet.saturdayStartTwo = saturdayStartTwo;
    }
    if (saturdayEndTwo) {
      vet.saturdayEndTwo = saturdayEndTwo;
    }
    if (sundayStartOne) {
      vet.sundayStartOne = sundayStartOne;
    }
    if (sundayEndOne) {
      vet.sundayEndOne = sundayEndOne;
    }
    if (sundayStartTwo) {
      vet.sundayStartTwo = sundayStartTwo;
    }
    if (sundayEndTwo) {
      vet.sundayEndTwo = sundayEndTwo;
    }

    storeOneForLists(id, 'vet', vet, image);
    console.log('ver', vet);
    setName(false);
    setWhatsApp(false);
    setVisible(false);
    setImage(false);
  }

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
            style={{height: '70%', width: '95%'}}
            region={{
              //Home
              // latitude: -17.736334,
              // longitude: -63.18008,
              // Cocha
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.025,
              longitudeDelta: 0.025,
            }}
            zoomEnabled={true}
          />
        </View>
        <Overlay isVisible={visible}>
          <View style={styles.container}>
            <Text style={styles.overlayTitle}>🩺 NUEVO VETERINARIO ⛑️</Text>
            <TouchableOpacity
              style={styles.closeOverlay}
              onPress={toggle}
              onBackdropPress={toggle}>
              <Text style={styles.closeButtonText}>+</Text>
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.overlayLabel}>Nombre:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Dra. Karen o Veterinaría las Karen"
                onChangeText={val => setName(val)}
              />
              <Text style={styles.overlayLabel}>WhatsApp:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="60977768"
                onChangeText={val => setWhatsApp(val)}
              />
              <Text style={styles.overlayLabel}>Foto o Logo:</Text>
              <TouchableOpacity
                style={styles.pictureContainer}
                onPress={selectPhotoTapped}>
                <View
                  style={[
                    styles.avatar,
                    styles.avatarContainer,
                    {marginBottom: 5},
                  ]}>
                  {image === false ? (
                    <Text style={styles.overlayDateButtonTitle}>
                      Click para subir foto
                    </Text>
                  ) : (
                    <Image style={styles.avatar} source={image} />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.overlayLabel}>Servicios:</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                  title="Ambulancia"
                  checked={ambulance}
                  size={12}
                  onPress={toggleAmbulance}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
                <CheckBox
                  title="Castración"
                  checked={castration}
                  size={12}
                  onPress={toggleCastration}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                  title="Desparasitación"
                  checked={deworming}
                  size={12}
                  onPress={toggleDeworming}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
                <CheckBox
                  title="Ecografía"
                  checked={ecography}
                  size={12}
                  onPress={toggleEcography}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                  title="Emergencias"
                  checked={emergency}
                  size={12}
                  onPress={toggleEmergency}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
                <CheckBox
                  title="Fumigación"
                  checked={fumigation}
                  size={12}
                  onPress={toggleFumigation}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                  title="Peluquería"
                  checked={hairdressing}
                  size={12}
                  onPress={toggleHairdressing}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
                <CheckBox
                  title="Atención a domicilio"
                  checked={home}
                  size={12}
                  onPress={toggleHome}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                  title="Cirugía"
                  checked={surgery}
                  size={12}
                  onPress={toggleSurgery}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
                <CheckBox
                  title="Vacunación"
                  checked={vaccination}
                  size={12}
                  onPress={toggleVaccination}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title="Atención por WhatsApp"
                  checked={whatsAppVet}
                  size={12}
                  onPress={toggleWhatsAppVet}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
                <CheckBox
                  title="Rayos X"
                  checked={xRay}
                  size={12}
                  onPress={toggleXRay}
                  textStyle={styles.overlayCheckBoxText}
                  checkedColor={colors.brown}
                />
              </View>
              <Text style={styles.overlayLabel}>Horarios de atención:</Text>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Lunes: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setMondayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setMondayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setMondayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setMondayEndTwo(val)}
                />
              </View>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Martes: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setTuesdayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setTuesdayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setTuesdayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setTuesdayEndTwo(val)}
                />
              </View>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Miércoles: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setWednesdayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setWednesdayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setWednesdayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setWednesdayEndTwo(val)}
                />
              </View>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Jueves: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setThursdayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setThursdayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setThursdayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setThursdayEndTwo(val)}
                />
              </View>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Viernes: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setFridayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setFridayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setFridayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setFridayEndTwo(val)}
                />
              </View>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Sábado: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setSaturdayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setSaturdayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setSaturdayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setSaturdayEndTwo(val)}
                />
              </View>
              <View style={styles.overlayHoursRow}>
                <Text style={styles.overlayLabelHours}>Domingo: </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="8:00"
                  onChangeText={val => setSundayStartOne(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="12:00"
                  onChangeText={val => setSundayEndOne(val)}
                />
                <Text style={styles.overlayLabelHours}> y </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="14:00"
                  onChangeText={val => setSundayStartTwo(val)}
                />
                <Text style={styles.overlayLabelHours}> - </Text>
                <TextInput
                  style={styles.overlayTextInputHours}
                  selectionColor={colors.brown}
                  placeholder="18:00"
                  onChangeText={val => setSundayEndTwo(val)}
                />
              </View>
            </ScrollView>
            <View>
              <Button
                buttonStyle={styles.overlayFinishButton}
                titleStyle={styles.overlayDateButtonTitle}
                onPress={finish}
                title="Finalizar registro"
              />
            </View>
          </View>
        </Overlay>
        <TouchableOpacity
          style={styles.itemContainer}
          // onPress={() => overlayItem(item)}
        >
          <View style={styles.itemImageContainer}>
            <Image source={{uri: imageUrl}} style={styles.itemImage} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemName}>💛 {name} 💛</Text>
            <Text style={styles.itemText}>WhatsApp: {whatsApp}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggle}
            onBackdropPress={toggle}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
