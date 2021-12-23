import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import HomePageHeading from '../components/HomePageHeading/HomePageHeading';
import * as moviesApi from '../services/movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  console.log(movies);
  const urlImg = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    moviesApi.fetchPopularFilm().then(setMovies);
  }, []);

  return (
    <>
      <>
        <HomePageHeading text="Trending today" />
        {movies && (
          <ul>
            {movies.results.map(movie => (
              <li key={movie.id}>
                <NavLink to={`movies/${movie.id}`}>
                  <h3>{movie.title}</h3>
                  <img
                    src={`${urlImg}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </>
    </>
  );
}
