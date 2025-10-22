import { PermissionsAndroid, Platform } from 'react-native';

const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permissão da Câmera',
        message: 'Este app precisa acessar sua câmera.',
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

export default requestCameraPermission;