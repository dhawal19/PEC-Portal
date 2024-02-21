import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    type: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setType: (state, action) =>{
            state.type = action.payload;
        },
    }
});

// actions
export const { setUser, setToken, setType } = authSlice.actions;

// selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectType = (state) => state.auth.type;

// reducer
export default authSlice.reducer;