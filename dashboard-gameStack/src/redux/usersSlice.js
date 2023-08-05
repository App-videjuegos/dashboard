import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    allUsers: [],
    dataUser : {},
    gamesUser: [],
    usrMsgErr: "",
    userLoged:false,
    userToken:"",
    isLogged:"",
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
        notFoundUsersError: (state) => {
            state.notFoundUsers = true
          },
          setErrorMsg:(state,action)=>{
            state.msgerror= action.payload
        },
        updateUsr: (state, action) =>{
            state.dataUser = action.payload
        },
        gamesUsr: (state,action) =>{
            state.dataUser = action.payload 
        },
        setUserLoged:(state,action)=>{
            console.log("user-------->", action.payload)
            state.isLogged = action.payload
          },
          setUserToken:(state,action)=>{
            console.log("token------->", action.payload)
            state.userToken = `Bearer ${action.payload}`
          },
    }
})

export const { getAllUsers, getUserById, usrMsgErr, getUserbyName, notFoundUsersError, setErrorMsg, setUserLoged, setUserToken} = UsersSlice.actions

export default UsersSlice.reducer