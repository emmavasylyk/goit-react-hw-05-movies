import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import s from './Cast.module.css';
import notFoundImg from '../../image/not-image.png';

export default function Cast() {
  const urlImg = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesApi.fetchCastFilm(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && movie.cast.length === 0 && (
        <h2>We don't have any reviews for this movie.</h2>
      )}
      {movie && (
        <ul className={s.castList}>
          {movie.cast.map(cast => (
            <li className={s.castItem} key={cast.id}>
              <img
                className={s.castImg}
                src={
                  cast.profile_path
                    ? `${urlImg}${cast.profile_path}`
                    : notFoundImg
                }
                alt={cast.name}
              />
              <h3>{cast.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
