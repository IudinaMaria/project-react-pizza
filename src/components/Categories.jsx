import React from "react";

// onClickCategory берем из Home.jsx --из родительского компонента
function Categories({ value, onChangeCategory }) {
  // для отображения списка категорий и выбора категории
  // const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  // для выбора категории
  // const onClickCategory = (index) => {
  // setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i}
            /* onClick вызовись буквально при нажатии */
            onClick={() => onChangeCategory(i)}
            className={value == i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
