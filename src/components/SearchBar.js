// !!! IMPORTANT !!!
// This code is currently incomplete. This is a little tough to implement from what I (Ariya) have seen from documentation.

import { useState } from 'react';

function SearchBar() {
    const searchBar = () => {}
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }
}

export default SearchBar;
