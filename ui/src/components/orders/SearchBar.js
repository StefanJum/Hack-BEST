import SearchBar from 'material-ui-search-bar';
import React, { useState } from "react";


export default function SearchBarContent() {
	const [searched, setSearched] = useState("");
	// const requestSearch = (searchedVal: ) => {
	// 	return alert(searchedVal);
	// }
return (
	<SearchBar
		style = {{margin: '0 auto', height: '100%', width: "calc(100% - 100px)"}}
		value = {searched}
		// onChange = {(Event) = setSearched(Event)}
		onRequestSearch={() => alert(searched)}
	/>
);
}

