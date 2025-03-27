import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/index";
import { SearchContext } from "../App";

const Home = () => {

  const { searchValue } = React.useContext(SearchContext);

  // для отображения списка пицц и загрузки пицц
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);

  // для отображения списка категорий и выбора категории
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности', sortProperty: 'rating'
  });

  // для отображения списка сортировки и выбора сортировки через fetch
  React.useEffect(() => {
    setIsLoaded(true);

    // сортировка по возрастанию или убыванию в зависимости от выбора
    const sortBy = sortType.sortProperty.replace('-','');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    // передаетм в fetch адресс сервера то, что мы хотим получить
    fetch(
      `https://67e3389497fc65f5353912f7.mockapi.io/Items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoaded(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => (

    <PizzaBlock
      key={obj.id}
      {...obj}
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => ( <Skeleton key={index} /> ));

  return (
    <>
    <div className ="content">
        <div className ="container">
          <div className ="content__top">
          {/* Получаем индекс категории при нажатии на категорию из Home. В  Categories(родительский) передали пропс */}
          <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
          </div>
          <h2 className ="content__title">Все пиццы</h2>
          <div className ="content__items">{isLoaded ? skeletons : pizzas }
          </div>
          <Pagination onChangePage={number => setcurrentPage(number)} />
        </div>
      </div>
    </>
  );
}

export default Home;