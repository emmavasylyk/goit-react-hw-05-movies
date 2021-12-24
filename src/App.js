import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import 'modern-normalize/modern-normalize.css';
import AppBar from './components/AppBar/AppBar';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import Container from './components/Container/Container';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movies-details-page" */
  ),
);
const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView.js' /* webpackChunkName: "not-found-view" */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense
        fallback={
          <>
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </>
        }
      >
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
