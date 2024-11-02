import { createSlice } from "@reduxjs/toolkit";
import { defaults } from "autoprefixer";

const requestSlice=createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests: (state,action)=>action.payload,
        // removeConnections:()=>null,
    },
});
export const {addRequests}=requestSlice.actions;
export default requestSlice.reducer;