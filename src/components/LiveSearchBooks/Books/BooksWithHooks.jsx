import React, { useEffect, useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'


const BooksWithHooks = (props) => {

    let [showMoreIndex, setShowMoreIndex] = useState(5)

    //useEffect(() => {
        
    //})

    const onShowMoreBtnClick = () => {
        showMoreIndex = showMoreIndex + 5
        setShowMoreIndex(showMoreIndex)
    }

    if (props.books) {
        const books = props.books.map(book => <div key={book.id}>
            <h4>
                <a href={book.volumeInfo.infoLink} target="_blank" >
                    {book.volumeInfo.title}
                </a>
            </h4>
        </div>
        )
        return (
            <>
                {books}

                <button onClick={onShowMoreBtnClick} type="button" className="btn btn-info">
                    Show more
                </button>
            </>
        )
    } else {return <Preloader />}

}


export default BooksWithHooks