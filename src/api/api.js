import axios from 'axios'




const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes'
})

let cancelToken
export const booksAPI = {
    getBooks(searchText, startIndex = 0, maxResults = 5) {

        if (cancelToken) {
            cancelToken.cancel('Previous request was cancelled')
        }
        cancelToken = axios.CancelToken.source()

        
        
        //const searchTrim = searchText.trim()
        //if (searchTrim) {
            
            return instance.get(

                `?q=${searchText}&startIndex=${startIndex}&maxResults=${maxResults}`, 

                {cancelToken: cancelToken.token}

            ).then(response => response.status === 200 
                ? response.data 
                : undefined )
        //}
    }
}