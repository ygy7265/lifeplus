import {configureStore, createSlice} from "@reduxjs/toolkit";
let baseurl = createSlice(({
    name : 'url',
    initialState : "http://localhost:8080"
}))
export default configureStore({
    reducer:{
        baseurl : baseurl.reducer
    }
})