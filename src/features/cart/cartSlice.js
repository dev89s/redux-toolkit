import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => {
        return item.id !== itemId;
      });
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      cartItem.amount += 1;
    },
    decrese: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem.amount > 1)
        cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    }
  },
});

// console.log(cartItems);

export const { calculateTotal, clearCart, removeItem, increase, decrese } = cartSlice.actions;

export default cartSlice.reducer;