import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../services/movies-api';

export default function Cast() {
  const urlImg = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movie);
  useEffect(() => {
    moviesApi.fetchCastFilm(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      {movie && (
        <ul>
          {movie.cast.map(cast => (
            <li key={cast.id}>
              {cast.name}
              <img src={`${urlImg}${cast.profile_path}`} alt={cast.name} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
