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
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Button, CheckBox, Overlay} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import styles from '../../styling/vetBolStyles';
import {colors} from '../../styling/colors';
import marker from '../../assets/marker.png';
//Util
import database from '@react-native-firebase/database';
import {getKey, storeOneForLists} from '../../services/database';
import {requestLocationPermission} from '../../services/location';
//Image picker
import ImagePicker from 'react-native-image-picker';

export default function Veterinaries() {
  //List
  const [loading, setLoading] = useState(true);
  const [vets, setVets] = useState([]);

  function fillList(dbVets) {
    const list = [];
    dbVets.forEach(vet => {
      list.push({...vet._snapshot.value});
    });
    setVets(list);
    setLoading(false);
  }

  useEffect(() => {
    servicesToFalse();
    Geolocation.getCurrentPosition(info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
    const ref = database().ref('vet');
    ref.once('value', fillList);
  }, []);

  //Form
  const [name, setName] = useState(false);
  const [whatsApp, setWhatsApp] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://firebasestorage.googleapis.com/v0/b/veterinarias-bolivia.appspot.com/o/vet%2Flogo%202.jpg?alt=media&token=673b63ef-b059-43c2-afc6-f5cbb064f238',
  );

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

  //item
  const [itemName, setItemName] = useState('Veterinarias Bolivia');
  const [itemWhatsApp, setItemWhatsApp] = useState(false);
  const [itemImageUrl, setItemImageUrl] = useState();
  const [itemAmbulance, setItemAmbulance] = useState(false);
  const [itemCastration, setItemCastration] = useState(false);
  const [itemDeworming, setItemDeworming] = useState(false);
  const [itemEcography, setItemEcography] = useState(false);
  const [itemEmergency, setItemEmergency] = useState(false);
  const [itemFumigation, setItemFumigation] = useState(false);
  const [itemHairdressing, setItemHairdressing] = useState(false);
  const [itemHome, setItemHome] = useState(false);
  const [itemSurgery, setItemSurgery] = useState(false);
  const [itemVaccination, setItemVaccination] = useState(false);
  const [itemWhatsAppVet, setItemWhatsAppVet] = useState(false);
  const [itemXRay, setItemXRay] = useState(false);
  const [itemMondayStartOne, setItemMondayStartOne] = useState(false);
  const [itemMondayEndOne, setItemMondayEndOne] = useState(false);
  const [itemMondayStartTwo, setItemMondayStartTwo] = useState(false);
  const [itemMondayEndTwo, setItemMondayEndTwo] = useState(false);
  const [itemTuesdayStartOne, setItemTuesdayStartOne] = useState(false);
  const [itemTuesdayEndOne, setItemTuesdayEndOne] = useState(false);
  const [itemTuesdayStartTwo, setItemTuesdayStartTwo] = useState(false);
  const [itemTuesdayEndTwo, setItemTuesdayEndTwo] = useState(false);
  const [itemWednesdayStartOne, setItemWednesdayStartOne] = useState(false);
  const [itemWednesdayEndOne, setItemWednesdayEndOne] = useState(false);
  const [itemWednesdayStartTwo, setItemWednesdayStartTwo] = useState(false);
  const [itemWednesdayEndTwo, setItemWednesdayEndTwo] = useState(false);
  const [itemThursdayStartOne, setItemThursdayStartOne] = useState(false);
  const [itemThursdayEndOne, setItemThursdayEndOne] = useState(false);
  const [itemThursdayStartTwo, setItemThursdayStartTwo] = useState(false);
  const [itemThursdayEndTwo, setItemThursdayEndTwo] = useState(false);
  const [itemFridayStartOne, setItemFridayStartOne] = useState(false);
  const [itemFridayEndOne, setItemFridayEndOne] = useState(false);
  const [itemFridayStartTwo, setItemFridayStartTwo] = useState(false);
  const [itemFridayEndTwo, setItemFridayEndTwo] = useState(false);
  const [itemSaturdayStartOne, setItemSaturdayStartOne] = useState(false);
  const [itemSaturdayEndOne, setItemSaturdayEndOne] = useState(false);
  const [itemSaturdayStartTwo, setItemSaturdayStartTwo] = useState(false);
  const [itemSaturdayEndTwo, setItemSaturdayEndTwo] = useState(false);
  const [itemSundayStartOne, setItemSundayStartOne] = useState(false);
  const [itemSundayEndOne, setItemSundayEndOne] = useState(false);
  const [itemSundayStartTwo, setItemSundayStartTwo] = useState(false);
  const [itemSundayEndTwo, setItemSundayEndTwo] = useState(false);

  //overlay
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(prevState => !prevState);
  }

  //Days
  const [monday, setMonday] = useState('24 horas.');
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const [services, setServices] = useState('Emergencias');

  var list = [];
  function servicesToFalse() {
    setItemName(false);
    setItemWhatsApp(false);
    setItemImageUrl(
      'https://firebasestorage.googleapis.com/v0/b/veterinarias-bolivia.appspot.com/o/vet%2Flogo%202.jpg?alt=media&token=673b63ef-b059-43c2-afc6-f5cbb064f238',
    );
    setItemAmbulance(false);
    setItemCastration(false);
    setItemDeworming(false);
    setItemEcography(false);
    setItemEmergency(false);
    setItemFumigation(false);
    setItemHairdressing(false);
    setItemHome(false);
    setItemSurgery(false);
    setItemVaccination(false);
    setItemWhatsAppVet(false);
    setItemXRay(false);
    setMonday(false);
    setTuesday(false);
    setWednesday(false);
    setThursday(false);
    setFriday(false);
    setSaturday(false);
    setSunday(false);
  }

  function getMarkers() {
    vets.forEach(element => {
      list.push(
        <Marker
          key={element.id}
          coordinate={{
            latitude: parseFloat(element.latitude),
            longitude: parseFloat(element.longitude),
          }}
          centerOffset={{ x: 0, y: -30 }}
          onPress={() => {
            servicesToFalse();
            setItemName(element.name ? element.name : false);
            setItemWhatsApp(element.whatsApp ? element.whatsApp : false);
            setItemImageUrl(element.imageUrl ? element.imageUrl : false);

            var appendServices = '';
            appendServices = element.ambulance
              ? appendServices.concat('ambulancia, ')
              : appendServices;
            appendServices = element.castration
              ? appendServices.concat('castración, ')
              : appendServices;
            appendServices = element.deworming
              ? appendServices.concat('desparasitación, ')
              : appendServices;
            appendServices = element.ecography
              ? appendServices.concat('ecografía, ')
              : appendServices;
            appendServices = element.emergency
              ? appendServices.concat('emergencias, ')
              : appendServices;
            appendServices = element.fumigation
              ? appendServices.concat('fumigación, ')
              : appendServices;
            appendServices = element.hairdressing
              ? appendServices.concat('peluquería, ')
              : appendServices;
            appendServices = element.home
              ? appendServices.concat('atención a domicilio, ')
              : appendServices;
            appendServices = element.surgery
              ? appendServices.concat('cirugía, ')
              : appendServices;
            appendServices = element.vaccination
              ? appendServices.concat('vacunación, ')
              : appendServices;
            appendServices = element.whatsAppVet
              ? appendServices.concat('atención por WhatsApp, ')
              : appendServices;
            appendServices = element.xRay
              ? appendServices.concat('rayos X, ')
              : appendServices;

            setServices(
              appendServices.replace(/^\w/, c => c.toUpperCase()).slice(0, -2),
            );

            setMonday(
              element.mondayStartOne
                ? `Lunes: ${element.mondayStartOne}${
                    element.mondayEndOne
                      ? ` - ${element.mondayEndOne}${
                          element.mondayStartTwo
                            ? ` y ${element.mondayStartTwo}${
                                element.mondayEndTwo
                                  ? ` - ${element.mondayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setTuesday(
              element.tuesdayStartOne
                ? `Martes: ${element.tuesdayStartOne}${
                    element.tuesdayEndOne
                      ? ` - ${element.tuesdayEndOne}${
                          element.tuesdayStartTwo
                            ? ` y ${element.tuesdayStartTwo}${
                                element.tuesdayEndTwo
                                  ? ` - ${element.tuesdayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setWednesday(
              element.wednesdayStartOne
                ? `Miercoles: ${element.wednesdayStartOne}${
                    element.wednesdayEndOne
                      ? ` - ${element.wednesdayEndOne}${
                          element.wednesdayStartTwo
                            ? ` y ${element.wednesdayStartTwo}${
                                element.wednesdayEndTwo
                                  ? ` - ${element.wednesdayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setThursday(
              element.thursdayStartOne
                ? `Jueves: ${element.thursdayStartOne}${
                    element.thursdayEndOne
                      ? ` - ${element.thursdayEndOne}${
                          element.thursdayStartTwo
                            ? ` y ${element.thursdayStartTwo}${
                                element.thursdayEndTwo
                                  ? ` - ${element.thursdayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setFriday(
              element.fridayStartOne
                ? `Viernes: ${element.fridayStartOne}${
                    element.fridayEndOne
                      ? ` - ${element.fridayEndOne}${
                          element.fridayStartTwo
                            ? ` y ${element.fridayStartTwo}${
                                element.fridayEndTwo
                                  ? ` - ${element.fridayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setSaturday(
              element.saturdayStartOne
                ? `Sábado: ${element.saturdayStartOne}${
                    element.saturdayEndOne
                      ? ` - ${element.saturdayEndOne}${
                          element.saturdayStartTwo
                            ? ` y ${element.saturdayStartTwo}${
                                element.saturdayEndTwo
                                  ? ` - ${element.saturdayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setSunday(
              element.sundayStartOne
                ? `Domingo: ${element.sundayStartOne}${
                    element.sundayEndOne
                      ? ` - ${element.sundayEndOne}${
                          element.sundayStartTwo
                            ? ` y ${element.sundayStartTwo}${
                                element.sundayEndTwo
                                  ? ` - ${element.sundayEndTwo}`
                                  : ''
                              }`
                            : ''
                        }`
                      : ''
                  }`
                : false,
            );

            setLatitude(parseFloat(element.latitude));
            setLongitude(parseFloat(element.longitude));
          }}
          image={marker}
        />,
      );
    });
    return list;
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
    };

    if (ambulance) {
      vet.ambulance = ambulance;
    }
    if (castration) {
      vet.castration = castration;
    }
    if (deworming) {
      vet.deworming = deworming;
    }
    if (ecography) {
      vet.ecography = ecography;
    }
    if (emergency) {
      vet.emergency = emergency;
    }
    if (fumigation) {
      vet.fumigation = fumigation;
    }
    if (hairdressing) {
      vet.hairdressing = hairdressing;
    }
    if (home) {
      vet.home = home;
    }
    if (surgery) {
      vet.surgery = surgery;
    }
    if (vaccination) {
      vet.vaccination = vaccination;
    }
    if (whatsAppVet) {
      vet.whatsAppVet = whatsAppVet;
    }
    if (xRay) {
      vet.xRay = xRay;
    }
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

  const sendWhatsApp = () => {
    Linking.openURL(
      `whatsapp://send?text=Buenas, mi peludito necesita sus servicios.&phone=+591${itemWhatsApp}`,
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.darkYellow} />
      </View>
    );
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
            style={{height: Platform.OS === 'ios' ? 390 :360, width: '95%'}}
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
            zoomEnabled={true}>
            {getMarkers()}
          </MapView>
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
          style={styles.itemContainerVet}
          onPress={sendWhatsApp}>
          <View style={styles.itemImageContainerVet}>
            <Image source={{uri: itemImageUrl}} style={styles.itemImageVet} />
          </View>
          <View style={styles.itemContentVet}>
            <Text style={styles.itemNameVet}>💛 {itemName} 💛</Text>
            <View>
              <Text style={styles.itemTextTitleVet}>Realiza:</Text>
              <Text style={styles.itemTextVet} numberOfLines={0}>
                {services}
              </Text>
              <Text style={styles.itemTextTitleVet}>Horarios de Atención:</Text>
              {monday && <Text style={styles.itemTextVet}>{monday}</Text>}
              {tuesday && <Text style={styles.itemTextVet}>{tuesday}</Text>}
              {wednesday && <Text style={styles.itemTextVet}>{wednesday}</Text>}
              {thursday && <Text style={styles.itemTextVet}>{thursday}</Text>}
              {friday && <Text style={styles.itemTextVet}>{friday}</Text>}
              {saturday && <Text style={styles.itemTextVet}>{saturday}</Text>}
              {sunday && <Text style={styles.itemTextVet}>{sunday}</Text>}
            </View>
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
