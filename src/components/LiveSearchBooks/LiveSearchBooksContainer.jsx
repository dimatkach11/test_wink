import React from 'react'
import { booksAPI } from '../../api/api'
import LiveSearchBar from './LiveSearchBar/LiveSearchBar'
import Pagination from './Pagination/Pagination'

class LiveSearchBooksContainer extends React.Component {

    state = {
        books: null,
        isFetching: false,
        searchText: '',
        maxResults: 10, 
        totalItems: null,
        maxPaginationPagesNumber: [1, 2, 3],
        maxBooksPerPageChoices: [5, 10, 15, 20],
        currentPage: 1
    }

    //LiveSearchBar section____________________________________________________
    search =  (searchText, currentPage, maxResults) => {
        //searchText = 'ciao'
        try {
            booksAPI.getBooks(searchText, currentPage, maxResults).then(data => {
                if (data && data.totalItems !== 0) {

                    const books =  data.items 
                    const totalItems = data.totalItems 
                    
                    if (maxResults) {
                        maxResults = maxResults
                    } else {
                        maxResults = this.state.maxResults
                    }
                    
                    this.setState({books, totalItems, maxResults, searchText})

                } else {this.setState({books: null})}
            })
        } catch (error) {
            this.setState({books: null})
        }
    }

    onSearchChange =  e => {
        const searchText = e.currentTarget.value
        this.search(searchText)
        this.setState({searchText})
    }

    onMaxBooksPerPageChoiceClick = (e) => {
        const maxResults = e.currentTarget.value
        
        this.search(
            this.state.searchText, 
            this.state.currentPage,
            maxResults
        )
    }

    //Pagination section_______________________________________________________
    onPageClick = (e) => {
        
        const currentPage = e.currentTarget.value
        const maxResults = this.state.maxResults
        this.search(this.state.searchText, currentPage, maxResults)
        this.setState({currentPage})
    }

    onRightArrowClick = () => {
        const currentPage = this.state.currentPage + 1
        const maxResults = this.state.maxResults
        this.setState({currentPage})
        this.search(this.state.searchText, currentPage, maxResults)
    }

    onLeftArrowClick = () => {
        let currentPage = this.state.currentPage
        if(currentPage > 1) {
            currentPage = currentPage - 1
        }
        
        const maxResults = this.state.maxResults
        this.setState({currentPage})
        this.search(this.state.searchText, currentPage, maxResults)
    }

    //Render section___________________________________________________________
    renderBooks = () => {
        let books = this.state.books
        if (books) {
            books = this.state.books.map(book => <div key={book.id}>
                <h4>
                    <a href={book.volumeInfo.infoLink} target="_blank" >
                        {book.volumeInfo.title}
                    </a>
                </h4>
            </div>
            )
        }
        return books
    }

    render() {
        return (
            <>
            <LiveSearchBar 
                value = {this.state.value}
                maxBooksPerPageChoices = {this.state.maxBooksPerPageChoices}
                onSearchChange = {this.onSearchChange}
                renderBooks = {this.renderBooks}
                onMaxBooksPerPageChoiceClick = {this.onMaxBooksPerPageChoiceClick}
            />
            <Pagination
                totalItems = {this.state.totalItems} 
                maxResults = {this.state.maxResults} 
                currentPage = {this.state.currentPage} 
                maxPaginationPagesNumber = {this.state.maxPaginationPagesNumber} 
                onPageClick = {this.onPageClick} 
                onRightArrowClick = {this.onRightArrowClick}
                onLeftArrowClick = {this.onLeftArrowClick}
            />
            </>
        )
        
    }
}


export default LiveSearchBooksContainer