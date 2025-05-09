import React from "react";
import { Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { setCategoryId, setSort } from "./redux/slices/filterSlice";

import "./scss/app.scss";

export const SearchContext = React.createContext(); // создаем контекст для поиска export чтобы можно было использовать в других файлах

function App() {
  const [searchValue, setSearchValue] = React.useState(""); // создаем состояние для поиска грубо говоря глобальную, которую передаем далее в хедер, потом в поиск и потом из поиска достаем эти значения

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
