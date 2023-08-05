import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    getAllSls: [],
    getAllSlsUser:{},
    msgerror:"NULL",
}


export const salesSlice = createSlice({
    name : "sales",
    initialState,
    reducers:{
        getAllSls: (state, action) =>{
            state.getAllSls = action.payload
        },
        getAllSlsUser: (state, action) =>{
            state.getAllSlsUser = action.payload
        },
        setErrorMsg:(state,action)=>{
            state.msgerror= action.payload
        },
    }
})

export const { getAllSls, getAllSlsUser, setErrorMsg} = salesSlice.actions

export default salesSlice.reducer