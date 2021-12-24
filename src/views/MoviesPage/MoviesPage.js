import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import toastWarm from '../../helpers/toastWarn';
import 'react-toastify/dist/ReactToastify.css';
import * as moviesApi from '../../services/movies-api';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = e => setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Введите свой запрос!');
    }

    if (movies.total_results === 0) {
      return toastWarm(value);
    }
    navigate({ search: `query=${value}` });
    setValue('');
  };

  const urlImg = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (value) {
      return moviesApi.fetchFilm(value).then(setMovies);
    }
  }, [value]);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
                      : `https://lh3.googleusercontent.com/proxy/nK2XmP5pyx67oZPBV_0PUQPjuAWthGAmV0J-_SyCZIHdlEHVajliMo8t8hJtcoI6K38kpnWerHKL_TV5h1PHynujARQHUS8_qMDJWL2rfgk`
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
