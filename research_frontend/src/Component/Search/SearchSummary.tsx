// src/components/Search/SearchSummary.tsx
import React from "react";

interface SearchSummaryProps {
  summary: string;
  tokenUsage: {
    input: number | null;
    output: number | null;
  };
}

const SearchSummary: React.FC<SearchSummaryProps> = ({
  summary,
  tokenUsage,
}) => {
  return (
    <div className="search-summary">
      <h2>AI-Generated Summary</h2>
      <div className="summary-content">{summary}</div>

      {tokenUsage.input && tokenUsage.output && (
        <div className="token-usage">
          <span>
            Tokens used: {tokenUsage.input} (input) + {tokenUsage.output}{" "}
            (output)
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchSummary;
