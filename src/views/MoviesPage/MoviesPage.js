import { useState, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import toastWarm from '../../helpers/toastWarn';
import 'react-toastify/dist/ReactToastify.css';
import * as moviesApi from '../../services/movies-api';
import s from './MoviesPage.module.css';
import notFoundImg from '../../image/not-image.png';

export default function MoviesPage() {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const memorySearch =
    new URLSearchParams(location.search).get('query') ?? '' ?? toastWarm(value);

  const onSubmit = value => {
    moviesApi.fetchFilm(value).then(setMovies);
  };
  const handleNameChange = e => setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Введите свой запрос!');
    }

    onSubmit(value);
    setSearchParams({ query: value });
    setValue('');
  };

  const urlImg = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    onSubmit(memorySearch);
  }, [location.search, memorySearch]);

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.moviesInput}
          type="text"
          value={value}
          onChange={handleNameChange}
        />
        <button className={s.moviesButton} type="submit">
          Search
        </button>
      </form>
      {movies && (
        <ul className={s.movieList}>
          {movies.results.map(movie => (
            <li className={s.movieItem} key={movie.id}>
              <NavLink className={s.movieLink} to={`${movie.id}`}>
                <img
                  className={s.movieImg}
                  src={
                    movie.poster_path
                      ? `${urlImg}${movie.poster_path}`
                      : notFoundImg
                  }
                  alt={movie.title}
                />
                <h3 className={s.movieTitle}>{movie.title}</h3>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer theme={'colored'} />
    </>
  );
}
