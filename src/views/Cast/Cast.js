import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import s from './Cast.module.css';

export default function Cast() {
  const urlImg = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesApi.fetchCastFilm(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      {movie && (
        <ul className={s.castList}>
          {movie.cast.map(cast => (
            <li key={cast.id}>
              <img
                className={s.castImg}
                src={`${urlImg}${cast.profile_path}`}
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
