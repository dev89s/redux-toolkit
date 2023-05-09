import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  });

const cartItems = [];

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
  isError: false,
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
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = true;
    },

  }
});

// console.log(cartItems);

export const { calculateTotal, clearCart, removeItem, increase, decrese } = cartSlice.actions;

export default cartSlice.reducer;