import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  // начальное состояние
  categoryId: 0, // категория по умолчанию 0 (все - инекс категории)
  currentPage: 1, // номер страницы по умолчанию 1
  sort: {
    // сортировка по умолчанию
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  // создаем то, где будет обрабатываться состояние
  name: "filters", // имя слайса
  initialState, // начальное состояние
  reducers: {
    // редюсеры для изменения состояния
    setCategoryId: (state, action) => {
      // изменение категории
      state.categoryId = action.payload; // присваиваем новое значение категории
    },
    setSort: (state, action) => {
      // изменение сортировки
      state.sort = action.payload; // присваиваем новое значение сортировки
    },
    setCurrentPage: (state, action) => {
      // изменение номера страницы
      state.currentPage = action.payload; // присваиваем новое значение номера страницы
    },
    setFilters: (state, action) => {
      // изменение фильтров
      state.currentPage = action.payload.currentPage; // присваиваем новое значение номера страницы
      state.sort = action.payload.sort; // присваиваем новое значение сортировки
      state.categoryId = Number(action.payload.categoryId); // присваиваем новое значение категории
      // преобразуем строку в число
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
