import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/index";
import { SearchContext } from "../App";

const Home = () => {
  const navigate = useNavigate(); // хук для навигации по страницам
  const dispatch = useDispatch(); // useDispatch - хук для отправки экшенов в стор
  const isSearch = React.useRef(false); // useRef - хук для создания ссылки на элемент
  const isMounted = React.useRef(false); // useRef - хук для создания ссылки на элемент

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  ); // useSelector - хук для получения данных из стора
  const sortType = sort.sortProperty; // useSelector - хук для получения данных из стора для сортировки

  const { searchValue } = React.useContext(SearchContext);

  // для отображения списка пицц и загрузки пицц
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);

  const onChangeCategory = (id) => {
    // функция для изменения категории
    dispatch(setCategoryId(id)); // отправляем в стор новое значение категории
  };

  const onChangePage = (number) => {
    // функция для изменения номера страницы
    dispatch(setCurrentPage(number)); // отправляем в стор новое значение номера страницы
  };

  const fetchPizzas = () => {
    setIsLoaded(true);

    // сортировка по возрастанию или убыванию в зависимости от выбора
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios // запрос на сервер с помощью axios
      // получаем данные с сервера по API. limit - количество пицц на странице, page - номер страницы, category - категория, sortBy - сортировка, order - порядок сортировки, search - поиск
      .get(
        // получаем данные с сервера по API get запросом
        `https://67e3389497fc65f5353912f7.mockapi.io/Items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data); // получаем данные с сервера и записываем их в стейт items
        setIsLoaded(false); // меняем состояние загрузки на false
      });
    window.scrollTo(0, 0);
  };

    React.useEffect(() => {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1)); // получаем параметры из строки запроса

        const sort = list.find(
          (obj) => obj.sortProperty === params.sortProperty
        ); // находим сортировку по параметрам

        dispatch(
          setFilters({
            ...params,
            sort,
          }),
        ); // отправляем в стор новые параметры
        isSearch.current = true; // меняем состояние поиска на true
      }
    }, []);

  // для отображения списка сортировки и выбора сортировки через fetch
  React.useEffect(() => {
    window.scrollTo(0, 0); // прокручиваем страницу вверх при изменении страницы
    if (!isSearch.current) {
      fetchPizzas(); // если не было поиска, то вызываем функцию для получения пицц
    }
    isSearch.current = false; // меняем состояние поиска на false
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
  
      navigate(`?${queryString}`); // передаем параметры в строку запроса
    }
    isMounted.current = true; // меняем состояние монтирования на true
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));


  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* Получаем индекс категории при нажатии на категорию из Home. В  Categories(родительский) передали пропс */}
            <Categories
              value={categoryId}
              onChangeCategory={onChangeCategory}
            />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{isLoaded ? skeletons : pizzas}</div>
          {items.length === 0 && <p>По вашему запросу ничего не найдено</p>}
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
      </div>
    </>
  );
};

export default Home;
