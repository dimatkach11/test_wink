import { booksAPI } from "../api/api"


const SET_TEXT = 'SET_TEXT'
const SET_BOOKS = 'SET_BOOKS'
const SET_PAGINATION_PAGES = 'SET_PAGINATION_PAGES'


const initialState = {
    searchText: '',
    books: null,
    isFetching: false,
    maxResults: 5, 
    totalItems: null,
    maxPaginationPagesNumber: [1, 2, 3, 4],
    maxBooksPerPageChoices: [5, 10, 15, 20],
    currentPage: 1
}


const booksReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_TEXT: {
            return {
                ...state,
                searchText: action.newText
            }
        }
        case SET_BOOKS: {
            return {
                ...state,
                books: action.data.items,
                totalItems: action.data.totalItems,
            }
        }
        case SET_PAGINATION_PAGES: {
            return {
                ...state,
                maxPaginationPagesNumber: action.paginationPages
            }
        }
        default:
            return state
    }
}

export default booksReducer


//ActionCreators object for dispatch to use in UI
const setCurrentSearchText = (text) => ({
    type: SET_TEXT,
    newText: text
})
const setBooks = (data) => ({
    type: SET_BOOKS,
    data
})
export const setPaginationPages = (paginationPages) => ({
    type: SET_PAGINATION_PAGES,
    paginationPages
})

//thunksCreators function for dispatch to use in UI
export const getBooks = (searchText, currentPage, maxResults) =>
    (dispatch) => {
        
        const searchTextTrimmed = searchText.trim()
        if (searchTextTrimmed) {
            booksAPI.getBooks(searchText, currentPage, maxResults).then(data => {
                if (data && data.totalItems !== 0) {
                    dispatch(setCurrentSearchText(searchText))
                    dispatch(setBooks(data))
                }
            }) 
        } else {dispatch(setCurrentSearchText(''))}
    }