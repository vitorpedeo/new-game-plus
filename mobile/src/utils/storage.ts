import AsyncStorage from '@react-native-community/async-storage';

export const setData = async (key: string, token: string) => {
  try {
    await AsyncStorage.setItem(key, token);
    return true;
  } catch (error) {
    return false;
  }
};

export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return false;
  }
};

export const getMultipleData = async (firstKey: string, secondKey: string) => {
  try {
    return await AsyncStorage.multiGet([firstKey, secondKey]);
  } catch (error) {
    return false;
  }
};

export const clearData = async (key: string) => {
  try {
    await AsyncStorage.clear();

    return true;
  } catch (error) {
    return false;
  }
};
