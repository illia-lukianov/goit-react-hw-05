import { useEffect, useState } from 'react';
import { querySearchMovie } from '../../query to API/queryToTMDB';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import Header from '../../components/Header/Header';
import css from './MoviesPage.module.css';


export default function MoviesPage() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const query = searchParams.get('query') ?? '';

    async function handleSubmit(event) {
        event.preventDefault();
        const query = event.target.searchBar.value;


        if (query.trim() === "") {
            alert('This field required.');
            return;
        } else {
            setData([])
        }

        setSearchParams({"query": query})
    }

    useEffect(() => {
        if (query.trim() === '') return; 

        async function fetchMovie() {
        try {
            setLoader(true);
            const responce = await querySearchMovie(query);
            if (responce.data.results.length > 0) {
                setData(responce.data.results);
            } else {
                alert('Sorry but with your query nothing find:(');
                return;
            }
        } catch (error) {
            alert('Sorry but we have issue');
            
        } finally {
            setLoader(false);
        }
        }
        
        fetchMovie();

    }, [query])
    
    return (
        <>
            <Header/>
            <form className={css.moviePageForm} onSubmit={handleSubmit}>
                <input className={css.moviePageInput} name='searchBar'/>
                <button className={css.inputSubmitBtn} type='submit'>
                    <FaSearch  />
                </button>
            </form>
            <ul className={css.moviePageList}>
                {
                    data.map(({ id, title, backdrop_path }) => 
                        <Link className={css.linkToDetails} to={`/movies/${id}`} state='/'>
                            <li className={css.moviePageItem} key={id}>
                                <p className={css.movieName}>{title}</p>
                                <img className={css.movieImage} src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} />
                            </li>
                        </Link>
                    )
                }
            </ul>
            {loader && <p>Loading....</p>}
        </>
    )
}