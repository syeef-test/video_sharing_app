import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  adminId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      const response = action.payload;
      //console.log("Res", response);
      state.token = response.token;
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("adminId", response.adminId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("adminId");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
