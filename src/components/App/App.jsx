import ErrorMessage from '../ErrorMessage/ErrorMessage'
import ImageGallery from '../ImageGallery/ImageGallery'
import Loader from '../Loader/Loader'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import SearchBar from '../SearchBar/SearchBar'
import galleryQuery from '../../../API-query/gallery-query'
import { useEffect, useState } from 'react'
import ImageModal from '../ImageModal/ImageModal'
import { Slide, toast, ToastContainer } from 'react-toastify'


export default function App() {

const [items, setItems] = useState([]);
const [errors, setErrors] = useState(false);
const [loader, setLoader] = useState(false);
const [page, setPage] = useState(1);
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(null);
const [query, setQuery] = useState("")
  
async function submitSearchBar (event) {
    event.preventDefault();
    const newQuery = event.target.elements.SearchImages.value;

    if (!newQuery) {
      toast.error('Please enter your query...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
  };

    if (newQuery !== query) {
      setItems([]);
      setPage(1); 
      setQuery(newQuery);
    };
  };

  useEffect(() => {
    if (!query.trim()) return;

    const fetchImages = async () => { 
      try {
        setErrors(false);
        setLoader(true);
        const data = (await (galleryQuery(query, page))).data.results;
        if (!data ||data.length === 0) {
          toast.error('Sorry nothing found...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          return;
        }
        setItems((prevData) => [ ...prevData, ...data]);
      } catch {
        setErrors(true);
      } finally {
        setLoader(false);
      }
    }    
    fetchImages();
  }, [query, page]);


  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);
  
  const handleModalOpen = (id) => {
    setCurrentImage(() => items.find((image) => image.id === id));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLoadMoreBtn = () => {
    setPage((prevPage) =>
      prevPage + 1
    );
  };

  return (
    <>
      <SearchBar onSubmit={submitSearchBar} />
      <ImageGallery items={items} handleModalOpen={handleModalOpen} />
      {isModalOpen && currentImage && <ImageModal currentImage={currentImage} isModalOpen={isModalOpen} closeModal={handleModalClose} />}
      {items.length > 0 && <LoadMoreBtn handleLoadMoreBtn={handleLoadMoreBtn} />}
      {loader && <Loader />}
      {errors && <ErrorMessage />}
      <ToastContainer />
    </>
  )
}