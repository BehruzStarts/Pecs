import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';

export const storeLocalData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const storeLocalDataItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getPermissionAndLocalData = (key: string) => {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    checkLocalStoragePermission('READ_EXTERNAL_STORAGE');
    checkLocalStoragePermission('WRITE_EXTERNAL_STORAGE');
  }, []);

  async function checkLocalStoragePermission(type: string) {
    const txtType = type === 'READ_EXTERNAL_STORAGE' ? 'Read' : 'Write';
    const isPermissionGranted = await checkDevicePermission(
      `${txtType} Local Storage Permission`,
      `Permission to ${txtType.toLocaleLowerCase()} search history values`,
      'Cancel',
      'OK',
      'Location Permission Denied',
      type,
    );
    if (isPermissionGranted) {
      getData();
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        setLocalData(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return localData;
};

export const checkDevicePermission = async (
  title: string,
  message: string,
  cancel: string,
  ok: string,
  permissionDenied: string,
  permissionType: string,
) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS[permissionType],
    {
      title: title,
      message: message,
      buttonNegative: cancel,
      buttonPositive: ok,
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else {
    Alert.alert(title, permissionDenied, [{text: cancel, style: 'cancel'}]);
    return false;
  }
};

// export const getData = async (key: string) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };
