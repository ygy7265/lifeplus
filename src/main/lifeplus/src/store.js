import {configureStore, createSlice,getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
let baseurl = createSlice(({
    name : 'url',
    initialState : "http://localhost:8080"
}))
let calendar = createSlice({
    name : 'calendar',
    initialState :
             []
    ,
    reducers:{
        calendarAdd: (state,calendar) => {
            state.push(calendar.payload);
        },
        removeItem(state, item) {
            const itemId = item.payload;
            state[0] = state[0].filter(item => item.id !== itemId);

        },
        calendarPush: (state,calendar) => {
            state[0] = calendar.payload;
        }

    }
})
export let  {calendarAdd,removeItem,calendarPush} = calendar.actions;
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
        userEmail: userEmail.reducer,
        calendar: calendar.reducer
    },

    middleware: [...getDefaultMiddleware(), thunk]
})