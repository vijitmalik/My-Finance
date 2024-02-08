import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        bearerToken: '',
        isAuthenticatedUser: false,
        data: null,
        selectedPage: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.bearerToken = action.payload.bearerToken;
        },
        setIsAuthenticatedUser: (state, action) => {
            state.isAuthenticatedUser = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        logoutUser: (state) => {
            state.username = '';
            state.bearerToken = '';
            state.isAuthenticatedUser = false;
            state.selectedPage = "login";
        },
        setSelectedPage: (state, action) => {
            state.selectedPage = action.payload;
        }
    },
});

export const { logoutUser, setIsAuthenticatedUser, setData, setSelectedPage, setUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
