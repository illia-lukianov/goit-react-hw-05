import { useEffect, useState } from 'react';
import { queryTrandingMovies } from '../../query to API/queryToTMDB';
import css from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import MovieList from '../../components/MovieList/MovieList';
import { toast, ToastContainer } from 'react-toastify';

export default function HomePage() {
  const [isSearched, setIsSearched] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function query() {
      try {
        setLoader(true);
        setIsSearched(true);
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
       <MovieList movies={data} isSearched={isSearched}/>
      {loader && <p>Loading....</p>}
    </>
  );
}
