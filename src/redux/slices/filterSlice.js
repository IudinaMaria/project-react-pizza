import { createSlice } from '@reduxjs/toolkit';

const initialState = { // начальное состояние
  categoryId: 0, // категория по умолчанию 0 (все - инекс категории)
  sort: { // сортировка по умолчанию
    name: 'популярности', 
    sortProperty: 'rating'

  }
}

export const filterSlice = createSlice({ // создаем то, где будет обрабатываться состояние
  name: 'filters', // имя слайса
  initialState, // начальное состояние
  reducers: { // редюсеры для изменения состояния
    setCategoryId: (state, action) => { // изменение категории
      state.categoryId = action.payload; // присваиваем новое значение категории
    },
    setSort: (state, action) => { // изменение сортировки
      state.sort = action.payload; // присваиваем новое значение сортировки
  },
}
})

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;