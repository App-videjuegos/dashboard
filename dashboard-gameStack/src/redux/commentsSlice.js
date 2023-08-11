import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    allComments: [],
    // dataUser : {},
    // filteredUsers: [],
    // notFoundUsers: false,
    // msgerror:"NULL",
}


export const CommentsSlice = createSlice({
    name : "comments",
    initialState,
    reducers:{
        getAllComments: (state, action) =>{
            state.allComments = action.payload
        },
        getCommentsByName: (state, action) => {
            state.allComments = action.payload;
        },
        // getUserById: (state, action) =>{
        //     state.dataUser = action.payload
        // },
        // getUserbyName: (state,action)=>{
        //     state.allUsers= action.payload;
        //     state.notFoundGames = false           
        // },
        // usrMsgErr: (state,action) =>{
        //     state.dataUser = action.payload 
        // },
        // notFoundUsersError: (state,action) => {
        //     state.notFoundUsers = true
        //   },
        //   setErrorMsg:(state,action)=>{
        //     state.msgerror= action.payload
        // },
    }
})

export const {getAllComments,getCommentsByName} = CommentsSlice.actions

export default CommentsSlice.reducer