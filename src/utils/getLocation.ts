import Geolocation, { 
  GeoPosition, 
  GeoError 
} from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

const solicitaPermissaoLocalizacao = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Localização',
        message: 'Este app precisa acessar sua localização.',
        buttonNeutral: 'Pergunte depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const getLocation = (): Promise<Coordinates> => {
  return new Promise(async (resolve, reject) => {
    const response = await solicitaPermissaoLocalizacao();
    
    if (!response) {
      reject(new Error('Permissão de localização negada'));
      return;
    }

    Geolocation.getCurrentPosition(
      (position: GeoPosition) => {
        const { coords, timestamp } = position;
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      },
      (error: GeoError) => {
        let errorMessage = 'Erro ao obter localização';
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

const localizaoUsuario = async (): Promise<Coordinates> => {
  try {
    const location = await getLocation();
    console.log('Localização:', location);
    return location;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export default localizaoUsuario;