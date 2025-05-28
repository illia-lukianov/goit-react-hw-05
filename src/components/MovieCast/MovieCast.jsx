import { useEffect, useState } from 'react';
import { queryCastWithId } from '../../query to API/queryToTMDB'
import css from './MovieCast.module.css'
import { useParams } from 'react-router-dom';

export default function MovieCast() {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        async function LoadCast() {
            try {
                setLoader(true);
                const responce = await queryCastWithId(movieId);
                setData(responce.data);
            } catch (error) {
                alert('Sorry we have issue');
            } finally {
                setLoader(false);
            }
        }

        LoadCast();
    }, [movieId])

    return (
        <>  
            <p className={css.title}>Actors:</p>
            <ul className={css.list}>
            {data && data.cast.map((actor) => {
                if (actor.gender !== 0) {
                    return (
                    <li className={css.listItem} key={actor.id}>
                    <img className={css.img} src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} />
                        <p className={css.name} >Name: {actor.name}</p>
                        <p className={css.gender} >Gender: {actor.gender === 1 ? 'woman' : 'man'}</p>
                        <p className={css.popularity} >Popularity: {actor.popularity}</p>
                    </li>
                    )
                }}
            )}
            </ul>
            {loader && <p>Loading....</p>}
        </>
    )
}