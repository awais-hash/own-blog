import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        userData: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload; 
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;