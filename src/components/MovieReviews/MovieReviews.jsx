import { useEffect, useState } from 'react';
import { queryReviewsWithId } from '../../query to API/queryToTMDB';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function MovieReviews() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function LoadReviews() {
      try {
        setLoader(true);
        const responce = await queryReviewsWithId(movieId);
        setData(responce.data);
      } catch (error) {
        toast.error('Sorry, we have issue :(');
      } finally {
        setLoader(false);
      }
    }
    LoadReviews();
  }, [movieId]);

  return (
    <>
      <ToastContainer />
      <p>Review:</p>
      <ul className={css.list}>
        {data?.results && data?.results.length !== 0 ? (
          data.results.map((review) => {
            return (
              <li className={css.item} key={review.id}>
                <p>Name: {review.author}</p>
                <p>Username: {review.author_details.username}</p>
                <p>Popularity: {review.author_details.rating}</p>
                <p>Review: {review.content}</p>
                <a href={review.url}>Review</a>
              </li>
            );
          })
        ) : (
          <p>Sorry but review not found</p>
        )}
      </ul>
      {loader && <p>Loading....</p>}
    </>
  );
}
