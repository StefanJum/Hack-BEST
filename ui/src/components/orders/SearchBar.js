import SearchBar from 'material-ui-search-bar';
import React, { useState } from "react";


export default function SearchBarContent() {
	const [searched, setSearched] = useState("");
	const requestSearch = (searchedVal: string) => {
		return alert(searchedVal);
	}
return (
	<SearchBar
		value = {searched}
		onChange = {(searchVal) => requestSearch(searchVal)}
		onRequestSearch={() => alert(searched)}
	/>
);
}

