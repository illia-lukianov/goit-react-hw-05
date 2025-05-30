import { useEffect, useState } from 'react';
import { querySearchMovie } from '../../query to API/queryToTMDB';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Navigation from '../../components/Navigation/Navigation';
import css from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { toast, ToastContainer } from 'react-toastify';

export default function MoviesPage() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [isSearched, setIsSearched] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const query = event.target.searchBar.value;

    if (query.trim() === '') {
      toast.error('This field required.');
      return;
    } else {
      setData([]);
    }

    setSearchParams({ query: query });
  }

  useEffect(() => {
    if (query.trim() === '') return;

    async function fetchMovie() {
      try {
        setLoader(true);
        setIsSearched(true);
        const responce = await querySearchMovie(query);
        if (responce.data.results.length > 0) {
          setData(responce.data.results);
        }
      } catch (error) {
        toast.error('Sorry, we have issue :(');
      } finally {
        setLoader(false);
      }
    }

    fetchMovie();
  }, [query]);

  return (
    <>
      <ToastContainer />
      <Navigation />
      <form className={css.moviePageForm} onSubmit={handleSubmit}>
        <input className={css.moviePageInput} name="searchBar" />
        <button className={css.inputSubmitBtn} type="submit">
          <FaSearch />
        </button>
      </form>
      <MovieList movies={data} isSearched={isSearched}/>
      {loader && <p>Loading....</p>}
    </>
  );
}
