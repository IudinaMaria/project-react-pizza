import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';

export const store = configureStore({ // создаем стор и передаем в него редюсер
  reducer: { 
    filter, // передаем редюсер
    cart, // передаем редюсер
},
})