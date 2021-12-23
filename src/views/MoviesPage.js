import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
// import toastWarm from '../helpers/toastWarn';
import 'react-toastify/dist/ReactToastify.css';
import * as moviesApi from '../services/movies-api';

export default function MoviesPage() {
  const [value, setValue] = useState('');
  console.log(value);
  const [movies, setMovies] = useState(null);
  console.log(movies);

  const handleNameChange = e => setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Введите свой запрос!');
    }
    //   onSubmit(value);
    setValue('');
  };
  //   const hundleFormSubmit = inputQuere => {
  //     if (inputQuere !== inputValue) {
  //       setInputValue(inputQuere);
  //       setPage(1);
  //       setImageGallery([]);
  //       setStatus('pending');
  //     }
  //   };
  const urlImg = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    if (value) {
      return moviesApi.fetchFilm(value).then(setMovies);
    }
  }, [value]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleNameChange} />
        <button type="submit">Search</button>
      </form>
      {movies && (
        <ul>
          {movies.results.map(movie => (
            <li key={movie.id}>
              <NavLink to={`${movie.id}`}>
                <h3>{movie.title}</h3>
                <img src={`${urlImg}${movie.poster_path}`} alt={movie.title} />
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer theme={'colored'} />
    </>
  );
}
