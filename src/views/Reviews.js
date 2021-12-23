import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../services/movies-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesApi.fetchReviewsFilm(movieId).then(setMovie);
  }, [movieId]);

  // console.log(movie);
  return (
    <>
      {movie && movie.total_results === 0 && (
        <h2>We don't have any reviews for this movie.</h2>
      )}
      {movie && (
        <>
          <ul>
            {movie.results.map(movie => (
              <li key={movie.id}>
                <p>Author: {movie.author}</p>
                <p>{movie.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
