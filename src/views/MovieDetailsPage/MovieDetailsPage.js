import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as moviesApi from '../../services/movies-api';
import s from './MovieDetailsPage.module.css';
import notFoundImg from '../../image/not-image.png';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const urlImg = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchDetailsFilm(movieId).then(setMovie);
  }, [movieId]);

  const goBack = () => {
    if (
      location.pathname === `/movies/${movieId}/cast` ||
      location.pathname === `/movies/${movieId}/reviews`
    ) {
      navigate(-2);
    } else if (!location.state) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <button className={s.button} type="button" onClick={goBack}>
        <span className={s.buttonWrapper}>
          <ImArrowLeft2 />
          <span className={s.buttonText}>Go back</span>
        </span>
      </button>
      {movie && (
        <div className={s.movieWrapper}>
          <img
            className={s.movieImg}
            src={
              movie.poster_path ? `${urlImg}${movie.poster_path}` : notFoundImg
            }
            alt={movie.title}
          />
          <div className={s.movieDesc}>
            <h2>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h2>
            <p className={s.userScore}>User Score: {movie.vote_average}%</p>
            <p className={s.movieOverWrap}>
              <span className={s.movieOverview}>Overview</span> {movie.overview}
            </p>
            <p className={s.movieGenres}>Genres</p>
            <ul className={s.movieGenresList}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={s.dopInfo}>
        <p className={s.dopInfoTitle}>Additional information</p>
        <ul className={s.dopInfoList}>
          <li>
            <Link
              to={`/movies/${movieId}/cast`}
              state={{ from: location?.state?.from ?? '/' }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              state={{ from: location?.state?.from ?? '/' }}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <div className={s.routes}>
        <Suspense
          fallback={
            <>
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </>
          }
        >
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
