import { useEffect, useState } from 'react'
import { fetchImages } from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader'
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ImageModal from './components/ImageModal/ImageModal'
import './App.css';


function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleOpenModal = (imgUrl, imgAlt) => {
    setShowModal(true);
    setModalUrl(imgUrl);
    setModalAlt(imgAlt);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setShowBtn(data.total_pages && data.total_pages !== page);
        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.container}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        {images.length > 0 && <ImageGallery items={images} onOpen={handleOpenModal} />}
        {images.length > 0 && !isLoading && showBtn && <LoadMoreBtn onClik={handleLoadMore} />}
        {images.length > 0 && (
          <ImageModal modal={showModal} onClose={handleCloseModal} url={modalUrl} alt={modalAlt} />
        )}
      </div>
    </>
  );
}


export default App;
