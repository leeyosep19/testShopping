// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../utils/api";
// import { showToastMessage } from "../common/uiSlice";



// export const createReview = createAsyncThunk(
//   "reviews/createReview",
//   async ({ productId, review }, { rejectWithValue }) => {
//     try {
//       // POST 요청을 /reviews/:productId로 보냄
//       const response = await api.post(`/review/${productId}`, review);
//       console.log("리뷰 추가 성공:", response);
//       if (response.status !== 201) {
//         throw new Error(response.error);
//       }
//       return response.data; // 서버에서 받은 데이터 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "서버 오류"); // 오류 발생 시
//     }
//   }
// );


// // 비동기 리뷰 가져오기
// export const fetchReviews = createAsyncThunk(
//   'reviews/fetchReviews', 
//   async (productId) => {
//     const response = await api.get(`/review/${productId}`); // /reviews/:productId
//     return response.data;  // 서버에서 받은 리뷰 데이터를 반환
//   }
// );

// // 리뷰 삭제 (비동기)
// export const deleteReview = createAsyncThunk(
//   'reviews/deleteReview', // 액션 타입

//   async (reviewId, { dispatch, rejectWithValue }) => {
//     try {
//       // DELETE 요청을 /reviews/:id로 보냄
//       const response = await api.delete(`/review/${reviewId}`);
//       if (response.status !== 200) {
//         throw new Error(response.error);
//       }

//       // 성공 메시지 디스패치
//       dispatch(
//         showToastMessage({
//           message: "리뷰 삭제 완료",
//           status: "success",  // "error"에서 "success"로 변경 (리뷰 삭제 성공)
//         })
//       );

//       // 리뷰 목록 새로 고침
//       dispatch(fetchReviews(response.data.productId)); // 제품 ID에 해당하는 리뷰 목록을 새로 불러오기

//       return response.data.message; // 응답 데이터 반환
//     } catch (error) {
//       // 에러 발생 시 rejectWithValue 호출
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



// // 초기 상태 정의
// const initialState = {
//   reviews: [],
//   status: 'idle',  // 요청 상태를 추적 (idle, loading, succeeded, failed)
//   error: null,     // 오류 메시지
// };



// const reviewSlice = createSlice({
//   name: "review",
//   initialState,
//   reducers: {
//     addReview: (state, action) => {
//       state.reviews.push(action.payload); // 리뷰를 추가
//     },
//     removeReview: (state, action) => {
//       state.reviews = state.reviews.filter((review) => review.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchReviews.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchReviews.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.reviews = action.payload; // API에서 받은 리뷰 데이터로 업데이트
//       })
//       .addCase(fetchReviews.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(createReview.fulfilled, (state, action) => {
//         state.reviews.push(action.payload); // 새 리뷰를 리스트에 추가
//       })
//       .addCase(createReview.rejected, (state, action) => {
//         state.error = action.payload || '리뷰 추가 실패';
//       });
//   },
// });

// export const { addReview, removeReview } = reviewSlice.actions;

// export default reviewSlice.reducer;



// reviewSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utils/api';  // api 설정이 있는 파일을 임포트 (axios 또는 다른 HTTP 클라이언트)

// // 리뷰 생성 비동기 함수
// export const createReview = createAsyncThunk(
//   "review/createReview",
//   async ({ productId, rating, text, userId, createdAt }, { rejectWithValue }) => {
//     try {
//       const review = { rating, text, userId, createdAt };  // 필요한 데이터를 review 객체로 만듦
//       const response = await api.post(`/review/${productId}`, review);  // 서버로 POST 요청
//       return response.data.data;  // 서버에서 응답 받은 데이터 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "리뷰 생성 실패");  // 에러 처리
//     }
//   }
// );

// // 리뷰 가져오기 비동기 함수
// export const fetchReviews = createAsyncThunk(
//   "review/fetchReviews",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/review/${productId}`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "리뷰 가져오기 실패");
//     }
//   }
// );

// // 리뷰 삭제 비동기 함수
// export const deleteReview = createAsyncThunk(
//   "review/deleteReview",
//   async (reviewId, { rejectWithValue }) => {
//     try {
//       await api.delete(`/review/${reviewId}`);
//       return reviewId;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "리뷰 삭제 실패");
//     }
//   }
// );

// // 리뷰 슬라이스 생성
// const reviewSlice = createSlice({
//   name: "review",
//   initialState: {
//     reviews: [],
//     loading: {
//       createReview: false,
//       fetchReviews: false,
//       deleteReview: false,
//     },
//     error: "",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // 리뷰 생성
//       .addCase(createReview.pending, (state) => {
//         state.loading.createReview = true;
//       })
//       .addCase(createReview.fulfilled, (state, action) => {
//         state.loading.createReview = false;
//         state.error = "";
//         state.reviews.push(action.payload); // 새 리뷰 추가
//       })
//       .addCase(createReview.rejected, (state, action) => {
//         state.loading.createReview = false;
//         state.error = action.payload;
//       })

//       // 리뷰 가져오기
//       .addCase(fetchReviews.pending, (state) => {
//         state.loading.fetchReviews = true;
//       })
//       .addCase(fetchReviews.fulfilled, (state, action) => {
//         state.loading.fetchReviews = false;
//         state.error = "";
//         state.reviews = action.payload; // 리뷰 리스트 업데이트
//       })
//       .addCase(fetchReviews.rejected, (state, action) => {
//         state.loading.fetchReviews = false;
//         state.error = action.payload;
//       })

//       // 리뷰 삭제
//       .addCase(deleteReview.pending, (state) => {
//         state.loading.deleteReview = true;
//       })
//       .addCase(deleteReview.fulfilled, (state, action) => {
//         state.loading.deleteReview = false;
//         state.error = "";
//         state.reviews = state.reviews.filter(
//           (review) => review.id !== action.payload // 삭제된 리뷰 제거
//         );
//       })
//       .addCase(deleteReview.rejected, (state, action) => {
//         state.loading.deleteReview = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default reviewSlice.reducer;
