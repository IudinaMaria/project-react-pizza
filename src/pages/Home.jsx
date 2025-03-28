import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/index";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch(); // useDispatch - хук для отправки экшенов в стор
  const { categoryId, sort } = useSelector((state) => state.filter); // useSelector - хук для получения данных из стора
  const sortType = sort.sortProperty; // useSelector - хук для получения данных из стора для сортировки

  const { searchValue } = React.useContext(SearchContext);

  // для отображения списка пицц и загрузки пицц
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);

  // для отображения списка категорий и выбора категории
  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setcurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности', sortProperty: 'rating'
  // });

  const onChangeCategory = (id) => {
    // функция для изменения категории
    dispatch(setCategoryId(id)); // отправляем в стор новое значение категории
  };

  // для отображения списка сортировки и выбора сортировки через fetch
  React.useEffect(() => {
    setIsLoaded(true);

    // сортировка по возрастанию или убыванию в зависимости от выбора
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // передаетм в fetch адресс сервера то, что мы хотим получить
    fetch(
      `https://67e3389497fc65f5353912f7.mockapi.io/Items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(Array.isArray(arr) ? arr : []);
        setIsLoaded(false);
      });

    console.log(pizzas);
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
          <Pagination onChangePage={(number) => setcurrentPage(number)} />
        </div>
      </div>
    </>
  );
};

export default Home;
