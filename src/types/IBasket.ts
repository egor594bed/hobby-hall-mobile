export interface IDelivery {
  name: string;
  id: number;
  imgName: string;
  text: string;
  adressArr?: string[];
}

export interface IPayment {
  name: string;
  id: number;
  imgName: string;
  text: string;
}

export type BasketItem = [string, number];

export type BasketItemsPromise = Promise<BasketItem[] | null>;
