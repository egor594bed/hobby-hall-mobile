import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async getStorage(key: string) {
    try {
      let jsonValue = await AsyncStorage.getItem(key).then(data => {
        console.log('АСИНК СТОРАГЕ: ' + data);
        return data;
      });

      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {}
  }

  async saveStorage(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      this.getStorage('basket');
    } catch (error) {}
  }
}

export default new StorageService();
