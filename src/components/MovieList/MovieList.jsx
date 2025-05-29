import { Link } from 'react-router-dom'
import css from './MovieList.module.css'

export default function MovieList({movie :{ id, title, backdrop_path }}) {
    return (
        <Link className={css.linkToDetails} to={`/movies/${id}`} state='/'>
            <li className={css.moviePageItem} key={id}>
                <p className={css.movieName}>{title}</p>
                <img className={css.movieImage} src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} />
            </li>
        </Link>
    )
}