import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export async function requestLocationPermission() {
  var loc = false;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permiso para obtener tu ubicación',
        message:
          'Veterinarias Bolivia necesita tu ubicación ' +
          'para mostrarte los veterinarios más cerca a vos.',
        buttonNeutral: 'Preguntarme luego',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      console.log('Permiso de ubicación denegado');
    }
  } catch (err) {
    console.warn(err);
  }
  return loc;
}
