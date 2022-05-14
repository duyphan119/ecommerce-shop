import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_CART_NAME } from "../constants";
const initCart = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME));
const initialState = {
  cart: initCart
    ? initCart
    : {
        items: [],
        total: 0,
        count: 0,
      },
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      let index = state.cart.items.findIndex((item) => item.id === newItem.id);
      if (index !== -1) {
        state.cart.count -= state.cart.items[index].quantity;
        state.cart.total -=
          state.cart.items[index].product_price *
          state.cart.items[index].quantity;
        state.cart.items[index] = newItem;
        state.cart.count += state.cart.items[index].quantity;
        state.cart.total +=
          state.cart.items[index].product_price *
          state.cart.items[index].quantity;
      } else {
        state.cart.items.push(newItem);
        state.cart.count += newItem.quantity;
        state.cart.total = newItem.product_price * newItem.quantity;
      }
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    updateCart: (state, action) => {
      const newItem = action.payload;
      let index = state.cart.items.findIndex((item) => item.id === newItem.id);
      if (index !== -1) {
        state.cart.count -= state.cart.items[index].quantity;
        state.cart.total -=
          state.cart.items[index].product_price *
          state.cart.items[index].quantity;
        state.cart.items[index] = newItem;
        state.cart.count += state.cart.items[index].quantity;
        state.cart.total +=
          state.cart.items[index].product_price *
          state.cart.items[index].quantity;
      }
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      const index = state.cart.items.findIndex((item) => item.id === id);
      state.cart.count -= state.cart.items[index].quantity;
      state.cart.total -=
        state.cart.items[index].product_price *
        state.cart.items[index].quantity;
      state.cart.items = state.cart.items.filter((item) => item.id !== id);
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
  },
});
export const { getCart, addToCart, updateCart, removeCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
