import React from 'react'
import { connect } from 'react-redux'
import { getBooks, setPaginationPages } from '../../redux/books-reducer'
import BooksWithHooks from './Books/BooksWithHooks'
import LiveSearchBarWithHooks from './LiveSearchBar/LiveSearchBarWithHooks'
import Pagination from './Pagination/Pagination'

class LiveSearchBooksContainerWithHooks extends React.Component {

    componentDidUpdate(prevProps, prevState) {
    }

    //Render section___________________________________________________________
    render() {
        
        return (
            <>
            <LiveSearchBarWithHooks 
                searchText = {this.props.searchText}
                getBooks = {this.props.getBooks}
            />
            <BooksWithHooks books={this.props.books} />
            <Pagination
                searchText = {this.props.searchText}
                getBooks = {this.props.getBooks}
                maxBooksPerPageChoices = {this.props.maxBooksPerPageChoices}
                totalItems = {this.props.totalItems} 
                maxResults = {this.props.maxResults} 
                setPaginationPages = {this.props.setPaginationPages} 

                currentPage = {this.props.currentPage} 
                maxPaginationPagesNumber = {this.props.maxPaginationPagesNumber} 
                
                onPageNumberClick = {this.onPageNumberClick} 
                onRightArrowClick = {this.onRightArrowClick}
                onLeftArrowClick = {this.onLeftArrowClick}
            />
            </>
        )
        
    }
}

const mapStateToProps = (state) => {
    //debugger
    return {
        //depends on the server response:
        books: state.booksPage.books,
        searchText: state.booksPage.searchText,
        totalItems: state.booksPage.totalItems,
        // it does not depends on the server response:
        maxResults: state.booksPage.maxResults,
        currentPage: state.booksPage.currentPage,
        maxBooksPerPageChoices: state.booksPage.maxBooksPerPageChoices,
        maxPaginationPagesNumber: state.booksPage.maxPaginationPagesNumber,
    }
}

export default connect(mapStateToProps, {
    getBooks,
    setPaginationPages
})(LiveSearchBooksContainerWithHooks)

//export default LiveSearchBooksContainerWithHooks