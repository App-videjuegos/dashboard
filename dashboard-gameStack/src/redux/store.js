import { configureStore } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import videogamesReducer from './videogamesSlice';
import salesReducer from './salesSlice';
import commentsReducer from './commentsSlice'

export default configureStore({
    reducer:{
        videoGamesState: videogamesReducer,
        usersState: userReducer,
        salesState: salesReducer,
        // cartState: cartReducer,
        // reviews: reviewsReducer,
        commentsState:commentsReducer

    }
})