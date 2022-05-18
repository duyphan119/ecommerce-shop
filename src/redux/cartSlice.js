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
  selectedCartItems: {
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
          state.cart.items[index].detail.product.price *
          state.cart.items[index].quantity;
        state.cart.items[index] = newItem;
        state.cart.count += state.cart.items[index].quantity;
        state.cart.total +=
          state.cart.items[index].detail.product.price *
          state.cart.items[index].quantity;
      } else {
        state.cart.items.push(newItem);
        state.cart.count += newItem.quantity;
        state.cart.total = newItem.detail.product.price * newItem.quantity;
      }
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    updateCart: (state, action) => {
      const newItem = action.payload;
      let index = state.cart.items.findIndex((item) => item.id === newItem.id);
      if (index !== -1) {
        state.cart.count -= state.cart.items[index].quantity;
        state.cart.total -=
          state.cart.items[index].detail.product.price *
          state.cart.items[index].quantity;
        state.cart.items[index] = newItem;
        state.cart.count += state.cart.items[index].quantity;
        state.cart.total +=
          state.cart.items[index].detail.product.price *
          state.cart.items[index].quantity;
      }
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    removeCartItem: (state, action) => {
      const cartItem = action.payload;
      state.cart.count -= cartItem.quantity;
      state.cart.total -= cartItem.detail.product.price * cartItem.quantity;
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== cartItem.id
      );
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    removeCartItems: (state, action) => {
      const cartItems = action.payload;
      cartItems.forEach((cartItem) => {
        state.cart.count -= cartItem.quantity;
        state.cart.total -= cartItem.detail.product.price * cartItem.quantity;
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== cartItem.id
        );
      });
      localStorage.setItem(LOCALSTORAGE_CART_NAME, JSON.stringify(state.cart));
    },
    getSelectedCartItems: (state, action) => {
      state.selectedCartItems = action.payload;
    },
    selectCartItem: (state, action) => {
      const { id, quantity, detail } = action.payload;
      const index = state.selectedCartItems.items.findIndex(
        (item) => item.id === id
      );
      if (index === -1) {
        state.selectedCartItems.items.push(action.payload);
        state.selectedCartItems.total += quantity * detail.product.price;
        state.selectedCartItems.count += quantity;
      } else {
        state.selectedCartItems.total -=
          state.selectedCartItems.items[index].quantity *
          state.selectedCartItems.items[index].detail.product.price;
        state.selectedCartItems.count -=
          state.selectedCartItems.items[index].quantity;
        state.selectedCartItems.items[index] = action.payload;
        state.selectedCartItems.total += quantity * detail.product.price;
        state.selectedCartItems.count += quantity;
      }
    },
    deSelectCartItem: (state, action) => {
      const { id, quantity, detail } = action.payload;
      state.selectedCartItems.total -= quantity * detail.product.price;
      state.selectedCartItems.count -= quantity;
      state.selectedCartItems.items = state.selectedCartItems.items.filter(
        (item) => item.id !== id
      );
    },
  },
});
export const {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
  removeCartItems,
  getSelectedCartItems,
  selectCartItem,
  deSelectCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
