import React, { useEffect, useState } from 'react'


const Pagination = (props) => {
    
    let [startIndex, setStartIndex] = useState(0)
    let [pageNumber, setPageNumber] = useState(1)
    let [maxBooksPerPage, setMaxBooksPerPage] = useState(5)
    let [startIndexes, setStartIndexes] = useState(props.maxPaginationPagesNumber.map((pageNumber, index) => {
        return (pageNumber - 1) * maxBooksPerPage
    }))
    console.log(startIndexes);
    const onPageNumberClick = (e) => {
        
        const prevPageNumber = pageNumber
        pageNumber = e.currentTarget.value
        setPageNumber(e.currentTarget.value)
        const prevIndex = startIndex
        const pagesDiff = pageNumber - prevPageNumber
        //debugger
        //setStartIndex(prevIndex + maxBooksPerPage * pagesDiff)
        //setStartIndex(startIndexes[pageNumber - 1])
        //if (pageNumber === 1) {
        //    setStartIndex(0)
        //}
        
        const lastPage = props.maxPaginationPagesNumber[props.maxPaginationPagesNumber.length - 1]
        const firstPage = props.maxPaginationPagesNumber[0]
        if (pageNumber === lastPage) {
            const newStartIndexes = []
            const newPagination = props.maxPaginationPagesNumber.map((number, index) => {

                newStartIndexes.push((lastPage + index - 1)* maxBooksPerPage)
        
                return lastPage + index
            })

            setStartIndexes(newStartIndexes)
            props.setPaginationPages(newPagination)

        } else if (pageNumber !== 1 && pageNumber === firstPage) {
            const newStartIndexes = []
            const newPagination = props.maxPaginationPagesNumber.map((number, index) => {
                const paginationLength = props.maxPaginationPagesNumber.length
                
                if (pageNumber - paginationLength < 0) {
                    newStartIndexes.push(index * maxBooksPerPage)
                    return index + 1
                } else {
                    newStartIndexes.push((number - paginationLength + 1 - 1)* maxBooksPerPage)
                    return number - paginationLength + 1
                }
            })
            //debugger
            setStartIndexes(newStartIndexes)
            props.setPaginationPages(newPagination)
        }
        props.maxPaginationPagesNumber.map((page, index) => {
            if (pageNumber === page) {
                setStartIndex(startIndexes[index])
            }
        })
    }

    const onMaxBooksPerPageChoiceClick = (e) => {
        //debugger
        const prevMaxBooksPerPage = maxBooksPerPage
        maxBooksPerPage = e.currentTarget.value 
        const maxResultsDiff = maxBooksPerPage - prevMaxBooksPerPage
        
        let newPageNumber
        //debugger
        if (maxResultsDiff > 0) {
            newPageNumber = Math.ceil(startIndex / prevMaxBooksPerPage)
            if (newPageNumber === 1 && startIndex !== 0) {
                newPageNumber = 2
            }
            const newPaginationPages = []
            if (props.maxPaginationPagesNumber.some(elem => elem === newPageNumber)) {

                setStartIndexes(startIndexes.map((startIndex, index) => {
                    newPaginationPages.push(newPageNumber + index)
                    return startIndex === 0 ? 0 : (newPageNumber + index - 1) * maxBooksPerPage
                    //return startIndex === 0 ? 0 : startIndex * maxBooksPerPage / prevMaxBooksPerPage
                }))
            } else {
                //const newPaginationPages = []
                setStartIndexes(startIndexes.map((startIndex, index) => {
                    newPaginationPages.push(newPageNumber + index)
                    // ?
                    return startIndex === 0 ? 0 : (newPageNumber + index - 1) * maxBooksPerPage
                }))
                //props.setPaginationPages(newPaginationPages)
            }
            
            props.setPaginationPages(newPaginationPages)
            setMaxBooksPerPage(maxBooksPerPage)
            setPageNumber(newPageNumber)
        } else {

        }

        //if(!newPageNumber in props.maxPaginationPagesNumber) {
        //    const paginationLength = props.maxPaginationPagesNumber.length
        //    const newPagination = props.maxPaginationPagesNumber.map((number, index) => {
    
        //        return number - paginationLength + 1
        //    })
        //    props.setPaginationPages(newPagination)
        //}
        //setPageNumber(newPageNumber)
        setMaxBooksPerPage(maxBooksPerPage)
        
        //setStartIndexes(startIndexes.map((startIndex, index) => {
        //    return startIndex === 0 ? 0 : startIndex * maxBooksPerPage / prevMaxBooksPerPage
        //}))
    }

    useEffect(() => {
        debugger
        props.getBooks(props.searchText, startIndex, maxBooksPerPage)
    },[pageNumber, maxBooksPerPage])


    /*
    maxBooksPerPageChoices ok
    onMaxBooksPerPageChoiceClick ok
    totalItems ok
    maxResults ok
    maxPaginationPagesNumber ok
    onPageNumberClick ok
    onLeftArrowClick
    onRightArrowClick
    */
    
    const maxBooksPerPageChoices = props.maxBooksPerPageChoices.map(choice => {
    return (
        <li 
            key={choice} 
            onClick={onMaxBooksPerPageChoiceClick}
            value={choice}  >

            <a className="dropdown-item" href="#"> {choice} </a>

        </li>
    )
})

    const totalPages = Math.ceil(props.totalItems / props.maxResults)
    const maxPaginationPagesNumber = props.maxPaginationPagesNumber.map(PageNumber => {
        let className = "page-item"
        if(PageNumber === pageNumber) {
            className = "page-item active"
        }
        return (
            <li key={PageNumber} onClick={onPageNumberClick} value={PageNumber} className={className}>
                <a className="page-link" href="#"> {PageNumber} </a>
            </li>
        )
    })
    if (totalPages) {
        return (
            <>
            {/* Max books per page choices */}
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    max rendered books per page
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    
                    { maxBooksPerPageChoices }

                </div>
            </div>
            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li onClick={props.onLeftArrowClick} className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    { maxPaginationPagesNumber }

                    <li className="page-item disabled"><a className="page-link" href="#">...</a></li>
                    <li className="page-item disabled"><a className="page-link" href="#"> {totalPages} </a></li>
                    <li onClick={props.onRightArrowClick} className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            </>
        )
    } else { return <></> }
}


export default Pagination