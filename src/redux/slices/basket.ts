import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BasketService from '../../services/basket-service';
import { IProduct } from '../../types/ICatalog';

interface IBasketSlice {
  basketItemsObjs: IProduct[] | [];
  updatedFromLocalStorage: boolean;
  loading: boolean;
}

const initialState: IBasketSlice = {
  basketItemsObjs: [],
  updatedFromLocalStorage: false,
  loading: false,
};

export const getBasketItems = createAsyncThunk(
  'basketSlice/getBasketItems',
  async () => {
    try {
      const basketArr = await BasketService.getBasketItems();
      if (basketArr === null || basketArr === undefined || !basketArr[0])
        return null;

      const basketArrObjs = await fetch(
        'https://hobby-hall.onrender.com/api/catalog/getBasketGoods',
        {
          method: 'POST',
          body: JSON.stringify(basketArr),
          headers: {
            'content-type': 'application/json',
          },
        },
      ).then(res => res.json());

      return { basketArrObjs: basketArrObjs.basketArr, basketArr };
    } catch (e) {}
  },
);

export const getNewBasketItem = createAsyncThunk(
  'basketSlice/getNewBasketItem',
  async (id: string) => {
    try {
      const newBasketItemObj = await fetch(
        `https://hobby-hall.onrender.com/api/catalog/getProduct?id=${id}`,
        {
          method: 'GET',
        },
      ).then(res => res.json());
      return newBasketItemObj.product;
    } catch (e) {}
  },
);

export const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {
    removeBasketItem: (state, action: PayloadAction<string>) => {
      const newBasketArr = BasketService.removeBasketItem(
        state.basketItemsObjs,
        action.payload,
      );
      state.basketItemsObjs = [...newBasketArr];
    },
    changeBasketItemTotal: (
      state,
      action: PayloadAction<{ id: string; total: number }>,
    ) => {
      const newBasketArr = BasketService.changeBasketItemTotal(
        state.basketItemsObjs,
        action.payload.id,
        action.payload.total,
      );
      state.basketItemsObjs = newBasketArr;
    },
  },
  extraReducers: builder => {
    //getBasketItems
    builder.addCase(getBasketItems.pending, state => {
      state.loading = true;
    });

    builder.addCase(getBasketItems.fulfilled, (state, action) => {
      console.log('В ЭКШНЖ ' + action.payload);
      if (action.payload === null || action.payload === undefined) {
        state.basketItemsObjs = [];
        state.updatedFromLocalStorage = true;
        return;
      }

      const { basketArrObjs, basketArr } = action.payload;

      for (let i = 0; i < basketArrObjs.length; i++) {
        const basketObj = basketArrObjs[i];
        for (let j = 0; j < basketArr.length; j++) {
          if (basketObj._id === basketArr[i][0]) {
            basketObj.total = basketArr[i][1];
          }
        }
      }

      state.basketItemsObjs = [...basketArrObjs];
      state.updatedFromLocalStorage = true;
      state.loading = false;
    });

    //getNewBasketItem
    builder.addCase(getNewBasketItem.pending, state => {
      state.loading = true;
    });

    builder.addCase(getNewBasketItem.fulfilled, (state, action) => {
      if (action.payload === null || action.payload === undefined) {
        return;
      }

      const basketItem = action.payload;
      basketItem.total = 1;

      state.basketItemsObjs = [...state.basketItemsObjs, basketItem];
      state.loading = false;
    });
  },
});

export const { removeBasketItem, changeBasketItemTotal } = basketSlice.actions;

export default basketSlice.reducer;
