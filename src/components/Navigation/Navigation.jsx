import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getActiveLinkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.isActive);
};

export default function Navigation() {
    return (
        <ul className={css.navLinkList}>
            <li><NavLink className={getActiveLinkClass} to='/'>Home</NavLink></li>
            <li><NavLink className={getActiveLinkClass} to='/movies'>Movies</NavLink></li>
        </ul>    
    )
}