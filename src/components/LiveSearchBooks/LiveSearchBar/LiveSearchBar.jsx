import React from 'react'
import Preloader from '../../common/Preloader/Preloader'

const LiveSearchBar = (props) => {

    const maxBooksPerPageChoices = props.maxBooksPerPageChoices.map(choice => {
        return (
            <li 
                key={choice} 
                onClick={props.onMaxBooksPerPageChoiceClick}
                value={choice}  >

                <a className="dropdown-item" href="#"> {choice} </a>

            </li>
        )
    })
    return (
        <>
        {/* Live search input */}
        <div>
            <input 
                placeholder="Search books"
                value={props.value}
                onChange={props.onSearchChange}
            />
        </div>

        {/* Max books per page choices */}
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                max rendered books per page
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                
                { maxBooksPerPageChoices }

            </div>
        </div>

        {/*  */}
        { !props.renderBooks() ? <Preloader /> : props.renderBooks() }
        
        </>
    )
}


export default LiveSearchBar