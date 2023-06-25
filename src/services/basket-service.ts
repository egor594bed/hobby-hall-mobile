import StorageService from './storage-service';
import { BasketItem, BasketItemsPromise } from '../types/IBasket';
import { IProduct } from '../types/ICatalog';

const storageName = 'basket';

class BasketService {
  getBasketItems() {
    const basketItems = StorageService.getStorage(storageName);

    return basketItems as BasketItemsPromise;
  }

  inBasket(basketArr: IProduct[], id: string) {
    for (let i = 0; i < basketArr.length; i++) {
      if (basketArr[i]._id === id) return true;
    }
    return false;
  }

  // toggleBasketItem(basketArr: IProduct[], id: string) {
  //   for (let i = 0; i < basketArr.length; i++) {
  //     if (basketArr[i]._id === id) {
  //       return this.removeBasketItem(basketArr, id);
  //     }
  //   }
  //   return this.addBasketItem(basketArr, id);
  // }

  changeBasketItemTotal(basketArr: IProduct[], id: string, total: number) {
    for (let i = 0; i < basketArr.length; i++) {
      if (basketArr[i]._id === id) {
        basketArr[i].total = total;
      }
    }

    return basketArr;
  }

  saveToAsyncStorage(basketArr: BasketItem[]) {
    StorageService.saveStorage(storageName, basketArr);
  }

  getTotal(basketArr: BasketItem[], id: string) {
    for (let i = 0; i < basketArr.length; i++) {
      if (basketArr[i][0] === id) {
        return basketArr[i][1];
      }
    }

    return 1;
  }

  removeBasketItem(basketArr: IProduct[], id: string) {
    let newBasketArr = basketArr.filter((elem: IProduct) => {
      if (elem._id === id) return false;
      return true;
    });

    return newBasketArr;
  }

  // private addBasketItem(basketArr: IProduct[] | [], id: string) {
  //   basketArr.push([id, 1]);
  //   return basketArr;
  // }
}

export default new BasketService();
