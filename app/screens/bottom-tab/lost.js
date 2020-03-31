import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';

//Util
import database from '@react-native-firebase/database';
import {simplifiedDate} from '../../services/utils';
import {getKey, storeOneForLists} from '../../services/database';

//Appearance
import styles from '../../styling/vetBolStyles';
import {colors} from '../../styling/colors';

//Date Picker
import DateTimePicker from '@react-native-community/datetimepicker';

//Image picker
import ImagePicker from 'react-native-image-picker';

export default function Lost() {
  //List
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  function fillList(dbPets) {
    const list = [];
    dbPets.forEach(pet => {
      list.push({...pet._snapshot.value});
    });
    setPets(list);
    console.log('list ', list);
    setLoading(false);
  }

  useEffect(() => {
    const ref = database().ref('lost');
    ref.once('value', fillList);
  }, []);

  //Item Overlay
  const [itemVisible, setItemVisible] = useState(false);
  const [itemImage, setItemImage] = useState(false);
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
    console.log('ure: ', itemImage);
  }

  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Encontré a su peludito&phone=+591' + itemWhatsApp,
    );
  };

  function itemToggle() {
    setItemVisible(prevState => !prevState);
  }

  //Form
  const [name, setName] = useState(false);
  const [desc, setDesc] = useState(false);
  const [whatsApp, setWhatsApp] = useState(false);
  const [address, setAddress] = useState(false);

  //overlay
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(prevState => !prevState);
  }

  function finish() {
    const id = getKey();
    storeOneForLists(
      id,
      'lost',
      {
        name,
        desc,
        whatsApp,
        address,
        lost: simplifiedDate(date),
      },
      image,
    );
    setName(false);
    setDesc(false);
    setWhatsApp(false);
    setAddress(false);
    setVisible(false);
    setShow(false);
    setImage(false);
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
            source={require('../../assets/lost_header.png')}
            style={styles.headerImage}
          />
        </View>
        <FlatList
          data={pets}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => overlayItem(item)}>
              <View style={styles.itemImageContainer}>
                <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>💛 {item.name} 💛</Text>
                <Text style={styles.itemText}>Descripción: {item.desc}</Text>
                <Text style={styles.itemText}>Dirección: {item.address}</Text>
                <Text style={styles.itemText}>WhatsApp: {item.whatsApp}</Text>
                <Text style={styles.itemText}>Fecha: {item.lost}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <Overlay isVisible={visible}>
          <View style={styles.container}>
            <Text style={styles.overlayTitle}>🐶💛 NUEVO PERDIDO 💛🐱</Text>
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
                onChangeText={val => setName(val)}
              />
              <Text style={styles.overlayLabel}>Descripción:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Negro con cola blanca, raza mestiza."
                onChangeText={val => setDesc(val)}
              />
              <Text style={styles.overlayLabel}>WhatsApp:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="60977768"
                onChangeText={val => setWhatsApp(val)}
              />
              <Text style={styles.overlayLabel}>Dirección:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Av. Beni esq. 4to anillo..."
                onChangeText={val => setAddress(val)}
              />
              <Text style={styles.overlayLabel}>Foto:</Text>
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
              <Text style={styles.overlayLabel}>Fecha:</Text>
              <View>
                <Button
                  buttonStyle={styles.overlayDateButton}
                  titleStyle={styles.overlayDateButtonTitle}
                  onPress={showMode}
                  title="Seleccionar fecha"
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
        <Overlay isVisible={itemVisible}>
          <View>
            <Text style={styles.itemOverlayName}>🐶💛 {itemName} 💛🐱</Text>
            <TouchableOpacity
              style={styles.closeOverlay}
              onPress={itemToggle}
              onBackdropPress={itemToggle}>
              <Text style={styles.closeButtonText}>+</Text>
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.itemOverlayImageContainer}>
                <Image
                  source={{uri: itemImage}}
                  style={styles.itemOverlayImage}
                />
              </View>
              <Text style={styles.itemOverlayLabel}>Descripción:</Text>
              <Text style={styles.itemOverlayLabelText}>{itemDesc}</Text>
              <TouchableOpacity style={styles.itemOverlayWhatsApp}>
                <Text
                  style={styles.itemOverlayWhatsAppLabel}
                  onPress={sendWhatsApp}>
                  💬 {itemWhatsApp} 💬
                </Text>
              </TouchableOpacity>
              <Text style={styles.itemOverlayLabel}>Dirección:</Text>
              <Text style={styles.itemOverlayLabelText}>{itemAddress}</Text>
              <Text style={styles.itemOverlayLabel}>Fecha:</Text>
              <Text style={styles.itemOverlayLabelText}>{itemLost}</Text>
            </ScrollView>
            <View>
              <Button
                buttonStyle={styles.overlayFinishButton}
                titleStyle={styles.overlayDateButtonTitle}
                onPress={itemToggle}
                title="Cerrar"
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
      <Image
        source={require('../../assets/cat.png')}
        style={styles.bottomCat}
      />
    </ImageBackground>
  );
}
