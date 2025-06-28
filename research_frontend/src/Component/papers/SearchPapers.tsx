// src/components/Papers/SearchPapers.tsx
import React, { useState } from "react";
import { searchPapers } from "../../services/paperApi";
import { PaperSearchResponse, ApiError } from "../../utils/types/apiTypes";

interface SearchPapersProps {
  onSearchComplete: (results: PaperSearchResponse) => void;
}

const SearchPapers: React.FC<SearchPapersProps> = ({ onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter research query"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Papers"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SearchPapers;
