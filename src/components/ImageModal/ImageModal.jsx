import Modal from 'react-modal';
import styles from './ImageModal.module.css'
import { RiCloseLargeLine } from "react-icons/ri";
import { useEffect } from 'react';

Modal.setAppElement("#root");
export default function ImageModal ({currentImage: {alt_description, color, description, likes, urls}, isModalOpen, closeModal}) {


    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        height: "90vh",
        overflow: "hidden",
        padding: "0",
        borderRadius: "20px",
        border: "2px solid #212121",
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
      overlay: {
        background: "rgba(0,0,0,0.7)",
      },
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <p className={styles.modalInfo}>{description || alt_description}</p>
                 <img src={urls.regular} className={styles.modalImg} alt={alt_description} />
                 <p className={styles.modalInfo}>Likes: {likes}</p>
                 <button className={styles.closeButton} onClick={closeModal}>
                     <RiCloseLargeLine className={styles.closeIcon} />
                 </button>
        </Modal>     
    )
}