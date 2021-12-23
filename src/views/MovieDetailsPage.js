import { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import * as moviesApi from '../services/movies-api';
import { useParams } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movie);
  const urlImg = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchDetailsFilm(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <button type="button" onClick={() => navigate('/', { replace: true })}>
        Go back
      </button>
      {movie && (
        <>
          <h2>
            {movie.title}({movie.release_date.slice(0, 4)})
          </h2>
          <p>Overview: {movie.overview}</p>
          <p>Genres</p>
          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p>User Score: {movie.vote_average}%</p>
          <img src={`${urlImg}${movie.poster_path}`} alt={movie.title} />
        </>
      )}
      <hr />
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Routes>
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </>
  );
}
