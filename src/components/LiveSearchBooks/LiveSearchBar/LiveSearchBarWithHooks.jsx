import React, { useEffect, useState } from 'react'


const LiveSearchBarWithHooks = (props) => {

    let [searchText, setSearchText] = useState('')

    //useEffect(() => {
    //    debugger
    //}, [props.searchText])
    
    const onSearchChange = (e) => {
        const text = e.currentTarget.value
        setSearchText(text)
        props.getBooks(text)
    }

    /*
    searchText
    onSearchChange
    */

    
    return (
        <>
        {/* Live search input */}
        <div>
            <input 
                placeholder="Search books"
                value={searchText}
                onChange={onSearchChange}
            />
        </div>
        </>
    )
}


export default LiveSearchBarWithHooks