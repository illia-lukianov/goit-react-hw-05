import styles from './SearchBar.module.css'
import { FaSearch } from "react-icons/fa";

export default function SearchBar ({onSubmit}) {

    return (
        <header className={styles.header}>
            <form className={styles.headerForm}onSubmit={onSubmit}>
                <input
                    className={styles.searchBar}
                    name='SearchImages'
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit" className={styles.submitButton}>
                    <FaSearch className={styles.searchBarIcon}/>
                </button>
            </form>
        </header>
    )
  }