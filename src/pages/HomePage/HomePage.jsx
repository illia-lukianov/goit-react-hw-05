import { useEffect, useState } from 'react';
import { queryTrandingMovies } from '../../query to API/queryToTMDB';
import css from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import MovieList from '../../components/MovieList/MovieList';
import { toast, ToastContainer } from 'react-toastify';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function query() {
      try {
        setLoader(true);
        setData([]);
        const responce = await queryTrandingMovies();
        setData(responce.data.results);
      } catch (error) {
        toast.error('Sorry, we have issue :(');
      } finally {
        setLoader(false);
      }
    }
    query();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navigation />
      <h1 className={css.title}>Tranding today</h1>
      <ul className={css.homePageList}>
        {data.map((movie) => (
          <MovieList key={movie.id} movie={movie} />
        ))}
      </ul>
      {loader && <p>Loading....</p>}
    </>
  );
}
