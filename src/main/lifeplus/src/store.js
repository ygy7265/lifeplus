import {configureStore, createSlice} from "@reduxjs/toolkit";
let baseurl = createSlice(({
    name : 'url',
    initialState : "http://localhost:8080"
}))

let userEmail = createSlice({
    name : 'userEmail',
    initialState : ()=> {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUserEmail = localStorage.getItem('email');
        return {
            userEmail: storedUserEmail,
            accessToken: storedAccessToken,
            refreshToken: storedRefreshToken
        };
    },
    reducers:{
        changeEmail: (state,email) => {
            state.userEmail = email.payload;
        }
    }
})
export const {changeEmail} = userEmail.actions;
export default configureStore({
    reducer:{
        baseurl : baseurl.reducer,
        userEmail: userEmail.reducer
    }
})