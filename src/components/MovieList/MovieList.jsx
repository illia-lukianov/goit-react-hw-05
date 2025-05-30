import { Link, useLocation } from 'react-router-dom'
import css from './MovieList.module.css'

export default function MovieList({movies, isSearched}) {
const location = useLocation()
console.log(location);

    return (
        <ul className={css.moviePageList}>
            {movies && movies.length !==0 ? movies.map((movie) => (
                <li className={css.moviePageItem} key={movie.id}>
                    <Link className={css.linkToDetails} to={`/movies/${movie.id}`} state={{ from: location }}>
                            <p className={css.movieName}>{movie.title}</p>
                            <img className={css.movieImage} src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                    </Link>
                </li>
            )) : isSearched && <p>Sorry but nothing found...</p>}
        </ul>
    )
}