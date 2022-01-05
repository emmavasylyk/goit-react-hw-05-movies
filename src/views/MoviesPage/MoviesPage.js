import { useState, useEffect } from 'react';
import {
  Link as NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import toastWarm from '../../helpers/toastWarn';
import 'react-toastify/dist/ReactToastify.css';
import * as moviesApi from '../../services/movies-api';
import s from './MoviesPage.module.css';
import notFoundImg from '../../image/not-image.png';
import { Pagination, Stack } from '@mui/material';

export default function MoviesPage() {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSearch = new URLSearchParams(location.search).get('page') ?? '1';

  const onSubmit = (searchText, pageNumber) => {
    if (!searchText || !pageNumber) {
      return;
    }
    moviesApi
      .fetchFilm(searchText, pageNumber)
      .then(res => {
        if (res.results && res.results.length === 0) {
          return toastWarm(searchText);
        }
        setMovies(res);
      })
      .catch(console.log);
  };

  useEffect(() => {
    const querySearch = new URLSearchParams(location.search).get('query');
    if (querySearch) {
      setValue(querySearch);
    }
    setPage(pageSearch);
  }, []);

  useEffect(() => {
    if (page > 1) {
      setSearchParams({ query: value, page: page });
    }
    onSubmit(value, page);
  }, [page, setSearchParams]);

  const handleNameChange = e => setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    setMovies(null);
    if (value.trim() === '') {
      setSearchParams({});
      return toast.error('Введите свой запрос!');
    } else {
      setSearchParams({ query: value, page: 1 });
    }
    // setPage(1);
    onSubmit(value, 1);
  };

  const urlImg = 'https://image.tmdb.org/t/p/w500';

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.moviesInput}
          type="text"
          defaultValue={value}
          onChange={handleNameChange}
        />
        <button className={s.moviesButton} type="submit">
          Search
        </button>
      </form>
      {movies && movies.total_results > 0 && (
        <ul className={s.movieList}>
          {movies.results.map(movie => (
            <li className={s.movieItem} key={movie.id}>
              <NavLink
                className={s.movieLink}
                to={`${movie.id}`}
                state={{ from: location?.state?.from ?? '/' }}
              >
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
      {movies && (
        <Stack spacing={2}>
          <Pagination
            className={s.pagination}
            count={movies.total_pages}
            page={Number(page)}
            onChange={handleChange}
          />
        </Stack>
      )}

      <ToastContainer theme={'colored'} />
    </>
  );
}
