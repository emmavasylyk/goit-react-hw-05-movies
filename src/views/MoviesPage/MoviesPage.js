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
  const [pageQty, setPageQty] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // let querySearch = '';
  // const querySearch =
  //   new URLSearchParams(location.search).get('query') ?? '' ?? toastWarm(value);
  const pageSearch = new URLSearchParams(location.search).get('page') ?? '1';
  console.log('location.search', location.search);
  console.log(pageSearch);

  const onSubmit = () => {
    console.log(value);
    console.log(page);
    if (!value || !page) {
      return;
    }
    console.log('888888');
    moviesApi.fetchFilm(value, page).then(setMovies, setPage);
  };

  useEffect(() => {
    console.log('location.search', location.search);
    if (!location.search) {
      console.log('5555');
      return;
    }
    console.log('22');
    onSubmit();
  }, [location.search, value, page]);

  useEffect(() => {
    const querySearch = new URLSearchParams(location.search).get('query');
    if (querySearch) {
      setValue(querySearch);
    }
    setPage(pageSearch);
  }, []);

  useEffect(() => {
    // if (value === '') {
    //   return;
    // }
    if (page > 1) {
      setSearchParams({ query: value, page: page });
    }
  }, [page, setSearchParams]);

  const handleNameChange = e => setValue(e.currentTarget.value.toLowerCase());
  const handleSubmit = e => {
    e.preventDefault();
    console.log('0', movies);

    console.log('2');
    if (value.trim() === '') {
      setMovies(null);
      setSearchParams({});
      console.log('3');
      return toast.error('Введите свой запрос!');
    } else {
      console.log('4');
      setSearchParams({ query: value });
    }
    console.log('5');

    onSubmit(value, page);
    if (!movies || (movies && movies.results.length === 0)) {
      return toastWarm(value);
    }
  };

  const urlImg = 'https://image.tmdb.org/t/p/w500';

  const handleChange = (e, value) => {
    setPage(value);
  };
  console.log(movies);

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.moviesInput}
          type="text"
          defaultValue={value}
          // defaultValue=""
          onChange={handleNameChange}
        />
        <button
          className={s.moviesButton}
          type="submit"
          // onClick={handleNameChange}
        >
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
            // renderItem={item => (
            //   <PaginationItem
            //     component={NavLink}
            //     to={`?page=${item.page}`}
            //     {...item}
            //   />
            // )}
          />
        </Stack>
      )}

      <ToastContainer theme={'colored'} />
    </>
  );
}
