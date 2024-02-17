import { useState, useEffect } from "react";
import api from "../components/authorization/api";
import VendorCard from "../components/shared/RestaurantCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await api.get(`/search?query=${searchQuery}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.log("Failed to fetch search results");
      }
    };

    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if search query is empty
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="border border-gray-800"
      />

    
      
    </div>
  );
};

export default Search;
