import { applyMiddleware, combineReducers, createStore } from "redux";
import booksReducer from "./books-reducer";
import thunkMiddleware from 'redux-thunk'


const reducers = combineReducers({
    booksPage: booksReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store