import { configureStore } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import videogamesReducer from './videogamesSlice';

export default configureStore({
    reducer:{
        videoGamesState: videogamesReducer,
        usersState: userReducer,
        // cartState: cartReducer,
        // salesState: salesReducer,
        // reviews: reviewsReducer,

    }
})