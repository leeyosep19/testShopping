// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createReview, fetchReviews, deleteReview } from '../features/review/reviewSlice';  // Make sure the path is correct

// const ReviewComponent = ({ productId }) => {
//   const dispatch = useDispatch();
//   const { reviews, loading, error } = useSelector((state) => state.review);

//   const [rating, setRating] = useState(1);
//   const [text, setText] = useState("");
//   // Remove userId state if not used
//   const [createdAt] = useState(new Date().toISOString());

//   useEffect(() => {
//     dispatch(fetchReviews(productId));  // 상품 ID에 해당하는 리뷰 목록을 불러옴
//   }, [dispatch, productId]);

//   const handleCreateReview = (e) => {
//     e.preventDefault();
//     dispatch(createReview({ productId, rating, text, createdAt }));
//     setRating(1);
//     setText(""); // 리뷰 작성 후 초기화
//   };

//   const handleDeleteReview = (reviewId) => {
//     dispatch(deleteReview(reviewId)); // 리뷰 삭제
//   };

//   if (loading.fetchReviews) return <p>리뷰 로딩 중...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       {/* 리뷰 작성 폼 */}
//       <form onSubmit={handleCreateReview}>
//         <div>
//           <label>평점</label>
//           <input 
//             type="number" 
//             value={rating} 
//             onChange={(e) => setRating(Number(e.target.value))} 
//             min="1" max="5"
//           />
//         </div>
//         <div>
//           <label>리뷰 내용</label>
//           <textarea 
//             value={text} 
//             onChange={(e) => setText(e.target.value)} 
//             required
//           />
//         </div>
//         <button type="submit">리뷰 작성</button>
//       </form>

//       {/* 리뷰 목록 */}
//       <div>
//         {reviews.map((review) => (
//           <div key={review.id}>
//             <p>평점: {review.rating}</p>
//             <p>내용: {review.text}</p>
//             <button onClick={() => handleDeleteReview(review.id)}>리뷰 삭제</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewComponent;
