import React from 'react';
import {Collection} from './Collection'
import './index.scss';

const categories = [
  {name: 'Все', index: 0},
  {name: 'Море', index: 1},
  {name: 'Горы', index: 2},
  {name: 'Артихектура', index: 3},
  {name: 'Города', index: 4},
];

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [category, setCategory] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    const categoryQuery = category ? `category=${category}` : '';

    setIsLoading(true);
    fetch(`https://6442a81e76540ce225923e4b.mockapi.io/collections?page=${page}&limit=3&${categoryQuery}`)
      .then((res) => (res.json()))
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.warn(error);
        alert("Error, data can't be retrieved...");
      })
      .finally(() => {setIsLoading(false)});
  }, [category, page]);
  
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((cat) => (
              <li onClick={() => setCategory(cat.index)} key={cat.index} className={(category === cat.index) ? ('active') : ('')}>{cat.name}</li>
            ))
          }
        </ul>
        <input className="search-input" placeholder="Поиск по названию" value={searchValue} onChange={(event) => setSearchValue(event.target.value)}/>
      </div>
      <div className="content">
        {
          isLoading ? (
            <h2>Секунду...</h2>
          ) : ( collections
            .filter((collection) => {
              return collection.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            .map((collection, index) => (
              <Collection key={index}
                name={collection.name}
                images={collection.photos}
              />    
          )))
        }
      </div>
      <ul className="pagination">
        {[...Array(5)].map( (_, i) => (
          <li key={i} className={(page === i + 1) ? ('active') : ('')} onClick={() => setPage(i + 1)}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
