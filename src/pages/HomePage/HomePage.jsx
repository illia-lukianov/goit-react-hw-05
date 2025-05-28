import { useEffect, useState } from 'react';
import { queryTrandingMovies } from '../../query to API/queryToTMDB'
import css from './HomePage.module.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

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
                alert('Sorry we have issue');
            } finally {
                setLoader(false);
            }
        }
        query();
    }, [])
    

    return (
        <>
            <Header/>
            <h1 className={css.title}>Tranding today</h1>
            <ul className={css.homePageList}>
                {
                    data.map(({ id, title, backdrop_path }) => 
                        <Link className={css.linkToDetails} key={id} to={`/movies/${id}`} state='/'>
                            <li className={css.homePageItem} >
                                <p className={css.movieName}>{title}</p>
                                <img className={css.movieImage} src={`https://image.tmdb.org/t/p/w200/${backdrop_path}`} />
                            </li>
                        </Link>
                    )
                }
            </ul>
            {loader && <p>Loading....</p>}
        </>
    )
}