import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    allUsers: [],
    dataUser : {}
}


export const UsersSlice = createSlice({
    name : "users",
    initialState,
    reducers:{
        getAllUsers: (state, action) =>{
            state.allUsers = action.payload
        },
        getUserById: (state, action) =>{
            state.dataUser = action.payload
        },
        usrMsgErr: (state,action) =>{
            state.dataUser = action.payload 
        },
    }
})

export const { getAllUsers, getUserById, usrMsgErr} = UsersSlice.actions

export default UsersSlice.reducer