import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Button, Overlay, Divider} from 'react-native-elements';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

//Util
import database from '@react-native-firebase/database';
import {getKey, storeOneForLists} from '../../services/database';

//Appearance
import styles from '../../styling/vetBolStyles';
import {colors} from '../../styling/colors';

export default function Products() {
  //List
  const [loading, setLoading] = useState(true);
  const [prods, setProds] = useState([]);

  const [order, setOrder] = useState([]);
  const [name, setName] = useState(false);
  const [whatsApp, setWhatsApp] = useState(false);
  const listItems = [];

  function addToList(item) {
    const itemToAdd = ({imageUrl, ...rest}) => rest;
    listItems.push(itemToAdd(item));
    Alert.alert(
      '¡Producto Añadido!',
      `Se añadió ${item.name} a su pedido.`,
      [{text: 'OK'}],
      {cancelable: false},
    );
  }

  function colapseOrder(list) {
    const result = [];
    const products = [];
    const quantities = [];
    const ids = [];
    const counters = [];
    var total = 0;
    list.forEach(element => {
      if (products.length > 0) {
        let index = products.indexOf(element.name);
        if (index >= 0) {
          quantities[index] = quantities[index] + element.price;
          counters[index] = ++counters[index];
        } else {
          products.push(element.name);
          quantities.push(element.price);
          ids.push(element.id);
          counters.push(1);
        }
      } else {
        products.push(element.name);
        quantities.push(element.price);
        ids.push(element.id);
        counters.push(1);
      }
      total += element.price;
    });
    result.push(products);
    result.push(counters);
    result.push(quantities);
    result.push(ids);
    result.push(total);
    console.log('result: ', result);
    setOrder(result);
  }

  function fillList(dbProds) {
    const list = [];
    dbProds.forEach(prod => {
      list.push({...prod._snapshot.value});
    });
    setProds(list);
    setLoading(false);
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
    const ref = database().ref('prod');
    ref.once('value', fillList);
  }, []);

  const sendWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Buenas, necesito Nexgard a domicilio&phone=+59170380258',
    );
  };

  //Map
  const [latitude, setLatitude] = useState(-17.736334);
  const [longitude, setLongitude] = useState(-63.18008);
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });

  function onRegionChange(mapRegion) {
    setRegion(mapRegion);
  }

  //overlay
  const [visible, setVisible] = useState(false);

  function toggleOverlay() {
    colapseOrder(listItems);
    setVisible(prevState => !prevState);
  }

  function toggle() {
    setVisible(prevState => !prevState);
  }

  var orderProducts = [];
  function orders() {
    if (order.length > 0) {
      order[3].forEach(element => {
        const index = order[3].indexOf(element);
        orderProducts.push(
          <View key={element}>
            <View
              style={{flexDirection: 'row', height: 35, alignItems: 'center'}}>
              <Text style={{flex: 2, color: colors.brown, fontSize: 17}}>
                {order[0][index]}
              </Text>
              <Text style={styles.checkOutLabel}>{order[1][index]}</Text>
              <Text style={styles.checkOutLabel}>{order[2][index]}</Text>
            </View>
            <Divider style={{backgroundColor: colors.darkYellow}} />
          </View>,
        );
      });
    }
    return orderProducts;
  }

  function finish() {
    order.push({name});
    order.push({whatsApp});
    order.push({latitude: region.latitude});
    order.push({longitude: region.longitude});
    console.log('order: ', order);
    const id = getKey();
    storeOneForLists(id, 'order', order);
    setOrder([]);
    Alert.alert(
      '¡Pedido Confirmado!',
      'En breve el equipo de Veterinarias Bolivia se pondrá en contacto con usted. ¡Gracias!',
      [{text: 'OK', onPress: () => toggle()}],
      {cancelable: false},
    );
  }

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
            source={require('../../assets/drawer/prods.png')}
            style={styles.headerImage}
          />
        </View>
        <FlatList
          data={prods}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemImageContainer}>
                <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
              </View>
              <View style={styles.itemContent}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.itemName, {fontSize: 20}]}>
                    💛 {item.name} 💛
                  </Text>
                  <Text style={styles.itemText}>
                    Precio: Bs. {item.price}.00.-
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToList(item)}>
                  <Text style={styles.addButtonLabel}>Añadir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <Overlay isVisible={visible}>
          <View style={styles.container}>
            <Text style={styles.overlayTitle}>🐶 CONFIRMAR PEDIDO 🐱</Text>
            <TouchableOpacity
              style={styles.closeOverlay}
              onPress={toggle}
              onBackdropPress={toggle}>
              <Text style={styles.closeButtonText}>+</Text>
            </TouchableOpacity>
            <ScrollView>
              {orders()}
              <View
                style={{
                  flexDirection: 'row-reverse',
                  height: 35,
                  alignItems: 'center',
                }}>
                <Text style={[styles.checkOutLabel, {fontWeight: 'bold'}]}>
                  Bs. {order[4]}.-
                </Text>
                <Text style={[styles.checkOutLabel, {flex: 2}]}>Total: </Text>
              </View>
              <Text style={styles.overlayLabel}>Nombre:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="Susana Montero"
                onChangeText={val => setName(val)}
              />
              <Text style={styles.overlayLabel}>WhatsApp:</Text>
              <TextInput
                style={styles.overlayTextInput}
                selectionColor={colors.brown}
                placeholder="60977768"
                onChangeText={val => setWhatsApp(val)}
              />
              <Text style={styles.overlayLabel}>
                Seleccione el lugar de entrega:
              </Text>
              <View style={{alignItems: 'center'}}>
                <MapView
                  style={{height: 180, width: '95%'}}
                  region={region}
                  zoomEnabled={true}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  onRegionChangeComplete={onRegionChange}
                />
                <Image
                  source={require('../../assets/marker.png')}
                  style={styles.myLocationMarker}
                />
              </View>
            </ScrollView>
            <View style={{flexDirection: 'row', alignContent: 'stretch'}}>
              <TouchableOpacity style={styles.acceptButton} onPress={finish}>
                <Text
                  style={[
                    styles.overlayDateButtonTitle,
                    {
                      fontWeight: 'bold',
                    },
                  ]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={toggle}>
                <Text style={styles.cancelButtonTitle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
        {/* <View style={{alignItems: 'center'}}>
          <MapView
            style={{height: 360, width: '95%'}}
            region={region}
            zoomEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={onRegionChange}
          />
          <Image
            source={require('../../assets/marker.png')}
            style={styles.myLocationMarker}
          />
        </View>*/}
        <View style={{alignItems: 'center'}}>
          <Button
            buttonStyle={styles.confirmOrder}
            titleStyle={styles.overlayDateButtonTitle}
            onPress={toggleOverlay}
            title="Confirmar Pedido"
          />
        </View>
        {/*
        <View>
          <Text>Necesito un producto</Text>
          <TouchableOpacity
            style={styles.itemOverlayWhatsApp}
            onPress={sendWhatsApp}>
            <Text style={styles.itemOverlayWhatsAppLabel}>💬 70380258 💬</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </ImageBackground>
  );
}
