import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HomePageHeading from '../../components/HomePageHeading/HomePageHeading';
import * as moviesApi from '../../services/movies-api';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const urlImg = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchPopularFilm().then(setMovies);
  }, []);

  return (
    <>
      <HomePageHeading text="Trending today" />
      {movies && (
        <ul className={s.homePageList}>
          {movies.results.map(movie => (
            <li className={s.homePageItem} key={movie.id}>
              <NavLink
                className={s.homePageLink}
                to={`movies/${movie.id}`}
                state={{ from: '/' }}
              >
                <img
                  className={s.movieImg}
                  src={`${urlImg}${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3 className={s.movieTitle}>{movie.title}</h3>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
