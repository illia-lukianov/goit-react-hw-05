import ImageCard from '../ImageCard/ImageCard'
import styles from './ImageGallery.module.css'

export default function ImageGallery ({items, handleModalOpen}) {

    return (
    <ul className={styles.gallerylist}>
            {items.map((item) => {
            return <ImageCard key={item.id} item={item} handleModalOpen={handleModalOpen} />
        })}
    </ul>
)}