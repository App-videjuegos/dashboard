import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    getAllSls: [],
    getAllSlsUser:{},
    msgerror:"NULL",
    getAllSls2: [],
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
        getAllSls2: (state, action) =>{
            state.getAllSls2 = action.payload
        },
    }
})

export const { getAllSls,getAllSls2,getAllSlsUser, setErrorMsg} = salesSlice.actions

export default salesSlice.reducer