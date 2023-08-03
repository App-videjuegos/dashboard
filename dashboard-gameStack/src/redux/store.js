import { configureStore } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import videogamesReducer from './videogamesSlice';


export default configureStore({
    reducer : {
        usersState: userReducer,
        videoGamesState: videogamesReducer,

    }
})