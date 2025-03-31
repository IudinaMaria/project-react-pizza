import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  // начальное состояние
  totalPrice: 0, // общая цена
  items: [], // массив с товарами
};

export const cartSlice = createSlice({
  // создаем то, где будет обрабатываться состояние
  name: "cart", // имя слайса
  initialState, // начальное состояние
  reducers: {
    addItem: (state, action) => {
      // изменение категории
      const findItem = state.items.find((obj) => obj.id === action.payload.id); // ищем товар в массиве
      if (findItem) {
        findItem.count++; // если нашли, увеличиваем счетчик
      } else {
        state.items.push({ ...action.payload, count: 1 }); // если не нашли, добавляем товар в массив с счетчиком 1
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum; // считаем общую цену
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      
      if (findItem){
      findItem.count--; // уменьшаем счетчик
      }// ищем товар в массиве
    },
    removeItem: (state, action) => {
      // изменение категории
      state.items = state.items.filter((obj) => obj.id !== action.payload); // удаляем товар из массива
    },
    clearItems(state) {
      // изменение категории
      state.items = []; // очищаем массив
      state.totalPrice = 0; // очищаем общую цену
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;
