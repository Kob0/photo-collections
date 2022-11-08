import React from 'react';

import Collection from './Collection';
import Pagination from './Pagination';

import './index.scss';

const catList = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const category = categoryId ? `&category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangePage = (num) => {
    setCurrentPage(num);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6367e4d6edc85dbc84de10fd.mockapi.io/photos-collection?&page=${currentPage}&limit=3${category}${search}`,
    )
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка! Не удалось получить данные!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, currentPage, searchValue]);

  return (
    <div className="wrapper">
      <div className="App">
        <h1>Моя коллекция фотографий</h1>
        <div className="top">
          <ul className="tags">
            {catList.map((cat, i) => (
              <li
                onClick={() => setCategoryId(i)}
                className={categoryId === i ? 'active' : ''}
                key={cat.name}>
                {cat.name}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
            placeholder="Поиск по названию"
          />
        </div>
        <div className="content">
          {isLoading ? (
            <h2>Идет загрузка ...</h2>
          ) : (
            collections
              // .filter((item) => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
              .map((item, index) => (
                <Collection key={index} name={item.name} images={item.photos} />
              ))
          )}
        </div>
        <ul className="pagination">
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </ul>
      </div>
    </div>
  );
}

export default App;
