import React, { useState } from "react";
import "./search.css"
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`/api/users?searchTerm=${searchTerm}`) // Make a GET request to your API endpoint for user search
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data); // Update the search results with the response data from the API
      })
      .catch((error) => {
        console.log("Error fetching search results:", error);
      });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search">
      <h1>User Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
