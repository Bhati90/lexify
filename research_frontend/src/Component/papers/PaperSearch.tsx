// src/components/Papers/PaperSearch.tsx
import React, { useState } from "react";
import { searchPapers } from "../../services/paperApi";
import { PaperSearchResponse, ApiError } from "../../utils/types/apiTypes";

interface PaperSearchProps {
  onSearchComplete: (results: PaperSearchResponse) => void;
}

const PaperSearch: React.FC<PaperSearchProps> = ({ onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchPapers(query);
      onSearchComplete(results);
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || "Failed to search papers");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="paper-search-container">
      <h2>Search Research Papers</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter research topic, keywords, or paper title"
            className="search-input"
          />
          <button type="submit" disabled={isLoading} className="search-button">
            {isLoading ? (
              <>
                <span className="spinner"></span> Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="search-tips">
        <h3>Search Tips:</h3>
        <ul>
          <li>Use specific keywords for better results</li>
          <li>Try paper titles or author names</li>
          <li>Combine terms with AND/OR for advanced searches</li>
        </ul>
      </div>
    </div>
  );
};

export default PaperSearch;
