import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'))
const MovieCast = lazy(() => import('../MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'))

export default function App() {
  return (
    <Suspense fallback={"Loading.... Please wait:)"}>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movies" element={<MoviesPage/>}/>
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast/>}/>
          <Route path="reviews" element={<MovieReviews/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Suspense>
  )
}