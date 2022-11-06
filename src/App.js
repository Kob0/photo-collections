import React from 'react';

import Collection from './Collection';

import './index.scss';

const catList = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

const pagesList = [1, 2, 3];

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const category = categoryId ? `category=${categoryId}` : '';
  const page = currentPage + 1;

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6367e4d6edc85dbc84de10fd.mockapi.io/photos-collection?&page=${page}&limit=3&${category}`,
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
  }, [categoryId, currentPage]);

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
              .filter((item) => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
              .map((item, index) => (
                <Collection key={index} name={item.name} images={item.photos} />
              ))
          )}
        </div>
        <ul className="pagination">
          {pagesList.map((page, i) => (
            <li
              onClick={() => setCurrentPage(i)}
              className={currentPage === i ? 'active' : ''}
              key={i}>
              {page}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
