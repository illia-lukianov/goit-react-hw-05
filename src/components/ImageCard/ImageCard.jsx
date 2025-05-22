import styles from './ImageCard.module.css'

export default function ImageCard ({item : {alt_description, urls, id}, handleModalOpen}) {
    
    return (
        <img className={styles.cardImg} src={urls.small} onClick={() => handleModalOpen(id)} alt={alt_description} />
    )
}