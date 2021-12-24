import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as moviesApi from '../../services/movies-api';
import { useParams } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const urlImg = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    moviesApi.fetchDetailsFilm(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <button
        className={s.button}
        type="button"
        onClick={() => navigate('/', { replace: true })}
      >
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
              movie.poster_path
                ? `${urlImg}${movie.poster_path}`
                : `https://lh3.googleusercontent.com/proxy/nK2XmP5pyx67oZPBV_0PUQPjuAWthGAmV0J-_SyCZIHdlEHVajliMo8t8hJtcoI6K38kpnWerHKL_TV5h1PHynujARQHUS8_qMDJWL2rfgk`
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
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
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
