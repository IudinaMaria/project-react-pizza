import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'

export const store = configureStore({ // создаем стор и передаем в него редюсер
  reducer: { 
    filter, // передаем редюсер
},
})