import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async getStorage(key: string) {
    try {
      let jsonValue = await AsyncStorage.getItem(key);

      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {}
  }

  async saveStorage(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }
}

export default new StorageService();
