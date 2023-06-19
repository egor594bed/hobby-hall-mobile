import StorageService from './storage-service';
import { BasketItem, BasketItemsPromise } from '../types/IBasket';

const storageName = 'basket';

class BasketService {
  getBasketItems() {
    const basketItems = StorageService.getStorage(storageName);

    return basketItems as BasketItemsPromise;
  }

  inBasket(basketArr: BasketItem[], id: string) {
    for (let i = 0; i < basketArr.length; i++) {
      if (basketArr[i].includes(id)) return true;
    }
    return false;
  }

  toggleBasketItem(basketArr: BasketItem[], id: string) {
    for (let i = 0; i < basketArr.length; i++) {
      if (basketArr[i][0] === id) {
        return this.removeBasketItem(basketArr, id);
      }
    }
    return this.addBasketItem(basketArr, id);
  }

  changeBasketItemTotal(basketArr: BasketItem[], id: string, total: number) {
    for (let i = 0; i < basketArr.length; i++) {
      if (basketArr[i][0] === id) {
        basketArr[i][1] = total;
      }
    }

    return basketArr;
  }

  saveToAsyncStorage(basketArr: BasketItem[]) {
    StorageService.saveStorage(storageName, basketArr);
  }

  private removeBasketItem(basketArr: BasketItem[], id: string) {
    let newBasketArr = basketArr.filter((elem: BasketItem) => {
      if (elem[0] === id) return false;
      return true;
    });

    return newBasketArr;
  }

  private addBasketItem(basketArr: BasketItem[], id: string) {
    basketArr.push([id, 1]);
    return basketArr;
  }
}

export default new BasketService();
