import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    allUsers: [],
    dataUser : {},
    filteredUsers: [],
    notFoundUsers: false,
    msgerror:"NULL",
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
        getUserbyName: (state,action)=>{
            state.allUsers= action.payload;
            state.notFoundGames = false           
        },
        usrMsgErr: (state,action) =>{
            state.dataUser = action.payload 
        },
        notFoundUsersError: (state,action) => {
            state.notFoundUsers = true
          },
          setErrorMsg:(state,action)=>{
            state.msgerror= action.payload
        },
    }
})

export const { getAllUsers, getUserById, usrMsgErr, getUserbyName, notFoundUsersError, setErrorMsg} = UsersSlice.actions

export default UsersSlice.reducer