# Лабораторная работа №3. Использование хуков и рендер списков

## Цель работы

Освоить использование хуков в React, научиться управлять состоянием компонентов с помощью `useState`, а также
реализовать динамическое рендеринг списка элементов.

## Условия

Разработайте приложение "интернет-магазин", где пользователи могут заказать товары. 

Выберите тему интернет-магазина из следующего списка:

- пиццерия;
- кофейня;
- суши-бар;
- магазин одежды;
- магазин рецептов;
- магазин книг;
- тема на выбор.

**Примечание**: Данная лабораторная работа будет показана на примере создания веб-приложения для онлайн-магазина мебели.

### Задание 1. Подготовка среды

1. Создайте новое React-приложение (_желательно_) или используйте проект из предыдущих лабораторных работ.

    - Если создаете новый проект, инициализируйте его с помощью `Vite`.
    - В проекте должно быть реализовано минимум четыре компонента:
        - `Header` – отображает название приложения и навигацию.
        - `Footer` – отображает копирайт и ссылку на репозиторий.
        - `ComponentCard` – отображает карточку компонента с товарами.
        - `ComponentList` – отображает список товаров, используя компонент ComponentCard.


### Задание 2. Создание мок-данных

1. Создайте файл `furniture.json` в папке `src/data/`.
2. Заполните его тестовыми данными, включающими следующие
   свойства: `id`, `name`, `description`, `price`, `image`, `category`, `sizes`.

   ```json
   [
     {
       "id": 1,
       "name": "Маргарита",
       "description": "Соус, сыр, помидоры",
       "price": 200,
       "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/furniture-3007395_960_720.jpg",
       "category": "Сырная",
       "sizes": [30, 40, 50]
     },
     {
       "id": 2,
       "name": "Пепперони",
       "description": "Соус, сыр, пепперони",
       "price": 250,
       "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/furniture-3007395_960_720.jpg",
       "category": "Мясная",
       "sizes": [30, 40, 50]
     }
   ]
   ```
3. Добавьте еще по 2 мебели для каждой категории.

### Задание 3. Создание базовых компонентов

1. Создайте компонент `Header.jsx`, который будет отображать название приложения и навигацию.
2. Создайте компонент `Footer.jsx`, который будет отображать копирайт и ссылку на репозиторий.

### Задание 4. Создание компонента списка мебели и рендеринг списка

1. Разработайте компонент `FurnitureCard.jsx`, который будет отображать карточку мебели, включая название, изображение,
   описание, цену и доступные размеры.

   ```jsx
   function FurnitureCard({ furniture }) {
     return (
       <div>
         <img src={furniture.image} alt={furniture.name} />
         <h2>{furniture.name}</h2>
         <p>{furniture.description}</p>
         <p>{furniture.price} лей.</p>
         <div>
           {furniture.sizes.map((size) => (
             <button key={size}>{size} см.</button>
           ))}
         </div>
         <button>Добавить в корзину</button>
       </div>
     );
   }
   ```

2. Разработайте компонент `FurnitureList.jsx`, который будет загружать данные из `furniture.json` и отображать список мебели.

   ```jsx
   import furnitureData from "../data/furniture.json";

   /* Создайте компонент FurnitureList */
   ```

### Задание 5. Использование хуков

1. В компоненте `FurnitureCard` добавьте состояние `selectedSize` и метод `handleSizeChange`, который будет обновлять
   выбранный размер мебели. При нажатии на кнопку размера мебели `selectedSize` должен изменятся.
2. Реализуйте логику выделения активного размера мебели при выборе соответствующей кнопки.

   ```jsx
   function FurnitureCard({ furniture }) {
     /* Добавьте состояние selectedSize */
   
   const handleSizeChange = (size) => {
        /* Обновите состояние selectedSize */
   };

     return (
       <div>
         <img src={furniture.image} alt={furniture.name} />
         <h2>{furniture.name}</h2>
         <p>{furniture.description}</p>
         <p>{furniture.price} лей.</p>
         <div>
           {furniture.sizes.map((size) => (
             <button
               key={size}
               {/*
                  Добавьте обработчик события onClick,
                  Который будет обновлять состояние selectedSize.
               */}
             >
               {size} см.
             </button>
           ))}
         </div>
         <button>Добавить в корзину</button>
       </div>
     );
   }
   ```

3. В` FurnitureList.jsx` добавьте состояние `furnitures`, в которое с помощью `useEffect` заносятся данные о мебели
   из `furniture.json`.

   ```jsx
   import { useState, useEffect } from "react";
   import furnitureData from "../data/furniture.json";

   function FurnitureList() {
     /* Добавьте состояние furnitures */

     useEffect(() => {
       /* Загрузите данные о мебели из furnitureData и обновите состояние */
     }, []);

     return <div>{/* Отобразите список мебели */}</div>;
   }
   ```

### Задание 6. Реализация слайдера

1. Создайте компонент `Slider.jsx`, который будет находиться сразу под `Header`.
2. Добавьте состояние `currentSlide`, которое будет хранить текущий активный слайд.
3. Реализуйте кнопки "Назад" и "Вперед" для переключения между слайдами.
4. _Дополнительное задание_. В `useEffect` добавьте автоматическое переключение слайдов каждые **3 секунды**.

### Задание 6. _Дополнительное задание_. Реализация поиска мебели

1. Создайте компонент `Search.jsx`, который будет содержать поле ввода для поиска.
2. Передайте в `Search` функцию обработчик `onSearch`, которая будет обновлять состояние списка мебели в `FurnitureList`.

   ```jsx
   function Search({ onSearch }) {
    const handleSearchChange = (e) => {
      /* Вызовите onSearch с  значением из поля ввода */
    };

    return (
      <input
        type="text"
        placeholder="Поиск..."
        {/*
          Добавьте обработчик события onChange, который будет обновлять состояние searchValue и вызывать onSearch.
        */}
      />
    );
   }
   ```

3. В `furnitureList.jsx` добавьте состояния:

    - `furnitures`, в которое с помощью useEffect загружаются данные из `furniture.json`;
    - `filteredFurnitures`, которое будет содержать отфильтрованный список мебели;

   ```jsx
   import { useState, useEffect } from "react";
   import furnitureData from "../data/furniture.json";
   import FurnitureCard from "./FurnitureCard";
   import Search from "./Search";

   function FurnitureList() {
     /* Добавьте состояния furnitures и filteredFurnitures */

     useEffect(() => {
       setFurnitures(furnitureData);
       setFilteredFurnitures(furnitureData);
     }, []);

     const handleSearch = (query) => {
       /* Реализуйте фильтрацию мебели по названию */
     };

     return (
       <div>
         <Search onSearch={handleSearch} />
         {/* Отобразите список мебели (filteredFurnitures) */}
       </div>
     );
   }

   export default FurnitureList;
   ```

### Задание 7. Документация проекта

1. Документируйте код в соответствии со стандартами JSDoc.

## Контрольные вопросы

1. Как использовать `useState` для управления состоянием?
2. Как работает `useEffect`?
3. С помощью какого метода можно рендерить списки элементов в React?