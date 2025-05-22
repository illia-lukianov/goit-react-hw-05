import styles from './LoadMoreBtn.module.css'
import { TiDownload } from "react-icons/ti";

export default function LoadMoreBtn ({handleLoadMoreBtn}) {

    return (
        <button className={styles.LoadMoreBtn} type="button" onClick={handleLoadMoreBtn}>
            <TiDownload  className={styles.LoadMoreBtnIcon} />
            <p className={styles.LoadMoreBtnDescr}>Load more</p>
        </button>
    )
  }