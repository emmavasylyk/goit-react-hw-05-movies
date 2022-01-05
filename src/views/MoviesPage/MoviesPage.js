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
import { Pagination, PaginationItem, Stack } from '@mui/material';

export default function MoviesPage() {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch =
    new URLSearchParams(location.search).get('query') ?? '' ?? toastWarm(value);
  console.log('location', location);
  const pageSearch = new URLSearchParams(location.search).get('page') ?? 1;

  const onSubmit = () => {
    console.log(value);
    moviesApi.fetchFilm(querySearch, pageSearch).then(setMovies, setPage);
  };

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    onSubmit(querySearch, pageSearch);
  }, [querySearch, pageSearch]);

  useEffect(() => {
    setPage(pageSearch);
  }, []);

  useEffect(() => {
    if (value === '') {
      return;
    }
    setSearchParams({ query: value, page: page });
  }, [value, page, setSearchParams]);

  const handleNameChange = e => setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Введите свой запрос!');
    }

    onSubmit(value, page);
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
            className={s.pagitanion}
            count={movies.total_pages}
            page={Number(page)}
            onChange={handleChange}
            renderItem={item => (
              <PaginationItem
                component={NavLink}
                to={`?page=${item.page}`}
                {...item}
              />
            )}
          />
        </Stack>
      )}

      <ToastContainer theme={'colored'} />
    </>
  );
}
