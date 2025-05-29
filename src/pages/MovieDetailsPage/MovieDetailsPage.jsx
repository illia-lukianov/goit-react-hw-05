import { Link, Outlet, useLocation, useParams} from 'react-router-dom'
import { queryDetailsWithId } from '../../query to API/queryToTMDB';
import { useEffect, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import Header from '../../components/Header/Header';

export default function MovieDetailsPage() {
    const [loader, setLoader] = useState(false);        
    
    const state = useLocation().state?.from ?? '/';
    const { movieId } = useParams();
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchMovieDetails() {   
            try {
                setLoader(true);
                const responce = await queryDetailsWithId(movieId);
                setData(responce.data)
            } catch (error) {
                alert('Sorry but we have issue');
            } finally {
                setLoader(false);
            }
        }
    fetchMovieDetails()
    }, [])
    
    return (
        <>
            <Header/>
            <div className={css.generalWrapper}>
                <div className={css.imgWrapper}>
                    <Link className={css.goBackBtn} to={state}>&#8592; Go back</Link>
                    <img className={css.img} src={`https://image.tmdb.org/t/p/w300/${data.backdrop_path}`} />
                </div>
                <div className={css.infoWrapper}>
                    <h1 className={css.title} >{data.original_title}</h1>
                    <p className={css.score} >User Score: {data.vote_average}</p>
                    <p className={css.overview} >Overview:<br/>{data.overview}</p>
                    <div className={css.genresWrapper} >Genres: {data.genres?.map(({ name, id }) => (
                        <p className={css.genre} key={id}>{name}</p>
                    ))}</div>
                </div>
            </div>
            
            <div className={css.moreInfoWrapper}>
                <p className={css.moreInfo}>Additional information:</p>
                <ul className={css.moreInfoList}>
                    <li className={css.moreInfoItem}><Link className={css.moreInfoLink} to='cast'>Cast</Link></li>
                    <li className={css.moreInfoItem}><Link className={css.moreInfoLink} to='reviews'>Reviews</Link></li>
                </ul>
            <Outlet/>
            </div>
            {loader && <p>Loading....</p>}
        </>
    )
}