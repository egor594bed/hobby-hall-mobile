import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BasketService from '../../services/basket-service';
import { BasketItem } from '../../types/IBasket';

interface IBasketSlice {
  basketItems: BasketItem[] | [];
  updatedFromLocalStorage: boolean;
}

const initialState: IBasketSlice = {
  basketItems: [],
  updatedFromLocalStorage: false,
};

export const getBasketItems = createAsyncThunk(
  'basketSlice/getBasketItems',
  async () => {
    try {
      const basketArr = BasketService.getBasketItems();
      return basketArr;
    } catch (e) {}
  },
);

export const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {
    toggleBasketItem: (state, action: PayloadAction<string>) => {
      state.basketItems = BasketService.toggleBasketItem(
        state.basketItems,
        action.payload,
      );
    },
    changeBasketItemTotal: (
      state,
      action: PayloadAction<{ id: string; total: number }>,
    ) => {
      state.basketItems = BasketService.changeBasketItemTotal(
        state.basketItems,
        action.payload.id,
        action.payload.total,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getBasketItems.fulfilled, (state, action) => {
      if (action.payload === null || action.payload === undefined) {
        state.basketItems = [];
        state.updatedFromLocalStorage = true;
        return;
      }
      state.basketItems = action.payload;
      state.updatedFromLocalStorage = true;
    });
  },
});

export const { toggleBasketItem, changeBasketItemTotal } = basketSlice.actions;

export default basketSlice.reducer;
