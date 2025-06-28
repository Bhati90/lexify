// src/components/Search/SearchResults.tsx
import React from "react";
import { PaperSearchResponse, PaperSummary } from "../../utils/types/apiTypes";
import PaperCard from "./PaperCard";

interface SearchResultsProps {
  results: PaperSearchResponse;
}

const handleSavePaper = (paperToSave: PaperSummary) => {
  // Implement your logic to save the paper here
  console.log("Saving paper:", paperToSave.title);
  // You might want to update the UI to reflect that the paper is saved
};
const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="search-results">
      {results.consolidated_summary && (
        <div className="summary">
          <h3>AI Summary</h3>
          <p>{results.consolidated_summary}</p>
        </div>
      )}

      <div className="papers-list">
        {results.papers.map((paper) => (
          <PaperCard
            key={paper.db_id}
            onSave={() => handleSavePaper(paper)}
            paper={paper}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
