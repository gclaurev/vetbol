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
import {useForm} from 'react-hook-form';

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

export default function Found() {
  //Form Hook
  const {register, handleSubmit, setValue, errors} = useForm();

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
    const ref = database().ref('found');
    ref.once('value', fillList);
    register(
      {name: 'formName'},
      {
        required: 'Campo requerido',
        maxLength: {value: 25, message: 'Máximo 25 caracteres'},
      },
    );
    register(
      {name: 'formDesc'},
      {
        required: 'Campo requerido',
        maxLength: {value: 50, message: 'Máximo 50 caracteres'},
      },
    );
    register(
      {name: 'formWhatsApp'},
      {
        required: 'Campo requerido',
        minLength: {value: 8, message: 'Número de WhatsApp inválido'},
        maxLength: {value: 8, message: 'Número de WhatsApp inválido'},
      },
    );
    register(
      {name: 'formAddress'},
      {
        required: 'Campo requerido',
        maxLength: {value: 50, message: 'Máximo 50 caracteres'},
      },
    );
    register(
      {name: 'formCity'},
      {
        required: 'Campo requerido',
        maxLength: {value: 10, message: 'Máximo 10 caracteres'},
      },
    );
  }, [register]);

  //Item Overlay
  const [itemVisible, setItemVisible] = useState(false);
  const [itemImage, setItemImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/veterinarias-bolivia.appspot.com/o/others%2Fdog.png?alt=media&token=1ab66ba9-49c7-4bf7-b211-57fc9eae000c',
  );
  const [itemName, setItemName] = useState(false);
  const [itemDesc, setItemDesc] = useState(false);
  const [itemWhatsApp, setItemWhatsApp] = useState(false);
  const [itemAddress, setItemAddress] = useState(false);
  const [itemFound, setItemFound] = useState(false);
  const [itemCity, setItemCity] = useState(false);

  function overlayItem(item) {
    setItemName(item.name);
    setItemImage(item.imageUrl);
    setItemDesc(item.desc);
    setItemWhatsApp(item.whatsApp);
    setItemAddress(item.address);
    setItemFound(item.found);
    setItemCity(item.city);
    setItemVisible(true);
  }

  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Usted encontró a mi peludito?&phone=+591' +
        itemWhatsApp,
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
  const [city, setCity] = useState(false);

  //overlay
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(prevState => !prevState);
  }

  const finish = data => {
    const id = getKey();
    storeOneForLists(
      id,
      'found',
      {
        name: data.formName,
        desc: data.formDesc,
        whatsApp: data.formWhatsApp,
        address: data.formAddress,
        found: simplifiedDate(date),
        city: data.formCity,
      },
      data.formImage,
    );
    setName(false);
    setDesc(false);
    setWhatsApp(false);
    setAddress(false);
    setVisible(false);
    setShow(false);
    setImage(false);
    setCity(false);
  };

  // datepicker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
        setValue('formImage', source);
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
            source={require('../../assets/found_header.png')}
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
                <Text style={styles.itemText}>Desc: {item.desc}</Text>
                <Text style={styles.itemText}>Dir: {item.address}</Text>
                <Text style={styles.itemText}>WhatsApp: {item.whatsApp}</Text>
                <Text style={styles.itemText}>Fecha: {item.found}</Text>
                <Text style={styles.itemText}>Dpto: {item.city}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <Overlay isVisible={visible}>
          <View style={styles.container}>
            <Text style={styles.overlayTitle}>🐶💛 NUEVO ENCONTRADO 💛🐱</Text>
            <TouchableOpacity
              style={styles.closeOverlay}
              onPress={toggle}
              onBackdropPress={toggle}>
              <Text style={styles.closeButtonText}>+</Text>
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.overlayLabel}>Nombre del peludito:</Text>
              {errors.formName && (
                <Text style={styles.overlayLabelError}>
                  {errors.formName.message}
                </Text>
              )}
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Recorcholis"
                onChangeText={val => setValue('formName', val)}
                // onChangeText={val => setName(val)}
              />
              <Text style={styles.overlayLabel}>Descripción:</Text>
              {errors.formDesc && (
                <Text style={styles.overlayLabelError}>
                  {errors.formDesc.message}
                </Text>
              )}
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Plomo con blanco y collar azul."
                onChangeText={val => setValue('formDesc', val)}
                // onChangeText={val => setDesc(val)}
              />
              <Text style={styles.overlayLabel}>WhatsApp:</Text>
              {errors.formWhatsApp && (
                <Text style={styles.overlayLabelError}>
                  {errors.formWhatsApp.message}
                </Text>
              )}
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="60977768"
                onChangeText={val => setValue('formWhatsApp', val)}
                // onChangeText={val => setWhatsApp(val)}
              />
              <Text style={styles.overlayLabel}>Dirección:</Text>
              {errors.formAddress && (
                <Text style={styles.overlayLabelError}>
                  {errors.formAddress.message}
                </Text>
              )}
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Av. Beni esq. 3er anillo..."
                onChangeText={val => setValue('formAddress', val)}
                // onChangeText={val => setAddress(val)}
              />
              <Text style={styles.overlayLabel}>Departamento:</Text>
              {errors.formCity && (
                <Text style={styles.overlayLabelError}>
                  {errors.formCity.message}
                </Text>
              )}
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Santa Cruz"
                onChangeText={val => setValue('formCity', val)}
                // onChangeText={val => setCity(val)}
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
                  title={date ? simplifiedDate(date) : 'Seleccionar fecha'}
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
                onPress={handleSubmit(finish)}
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
              <Text style={styles.itemOverlayLabel}>Departamento:</Text>
              <Text style={styles.itemOverlayLabelText}>{itemCity}</Text>
              <Text style={styles.itemOverlayLabel}>Fecha:</Text>
              <Text style={styles.itemOverlayLabelText}>{itemFound}</Text>
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
        source={require('../../assets/dog.png')}
        style={styles.bottomDog}
      />
    </ImageBackground>
  );
}
