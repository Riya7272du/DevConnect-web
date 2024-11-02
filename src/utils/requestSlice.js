import { createSlice } from "@reduxjs/toolkit";
import { defaults } from "autoprefixer";

const requestSlice=createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests: (state,action)=>action.payload,
        removeRequest:(state,action)=>{
            const newArray =state.filter((r)=>r._id !== action.payload);
            return newArray;
        }
    },
});
export const {addRequests,removeRequest}=requestSlice.actions;
export default requestSlice.reducer;