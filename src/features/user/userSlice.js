

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
import { initialCart } from "../cart/cartSlice";
import { addToCart } from './../cart/cartSlice';

// 이메일로 로그인
export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, {dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      sessionStorage.setItem("token", response.data.token);
      dispatch(
        showToastMessage({
          message: "로그인을 성공했습니다!!",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "로그인을 실패했습니다!!",
          status: "error",
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// 구글로 로그인
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/google",{token});
      if(response.status !== 200) throw new Error(response.error);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);
//카카오

// export const loginWithKakao = createAsyncThunk(
//   "user/loginWithKakao",
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/kakao", { token });

//       // 로그인 실패 시
//       if (response.status !== 200) {
//         throw new Error("카카오 로그인 실패");
//       }

//       // 성공 시 사용자 정보 반환
//       return response.data.user;
//     } catch (error) {
//       // 에러 메시지 반환
//       return rejectWithValue(error.error);
//     }

//   }
// );





// 회원가입
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post("./user", { email, name, password });
      dispatch(
        showToastMessage({
          message: "회원가입을 성공했습니다!!",
          status: "success",
        })
      );
      navigate("./login");
      return response.data.data;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "회원가입을 실패했습니다!!",
          status: "error",
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// 토큰으로 로그인
export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      sessionStorage.removeItem("/auth/login");
      dispatch(
        showToastMessage({
          message: "로그아웃 되었습니다!",
          status: "success",
        })
      );
      dispatch(initialCart());
      return true;
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "로그아웃에 실패했습니다.",
          status: "error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

// 사용자 상태 관리 Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })

     .addCase(loginWithGoogle.pending,(state,action)=>{
      state.loading = true;
     })
     .addCase(loginWithGoogle.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
      state.loginError = null;
     })
     .addCase(loginWithGoogle.rejected,(state,action)=>{
      state.loading = false;
      state.loginError = action.payload;
     })

    //  .addCase(loginWithKakao.pending,(state,action)=>{
    //   state.loading = true;
    //  })
    //  .addCase(loginWithKakao.fulfilled,(state,action)=>{
    //   state.loading = false;
    //   state.user = action.payload;
    //   state.loginError = null;
    //  })
    //  .addCase(loginWithKakao.rejected,(state,action)=>{
    //   state.loading = false;
    //   state.loginError = action.payload;
    //  });


  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
