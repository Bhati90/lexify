// src/components/Search/SearchResultsPage.tsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { searchPapers } from "../../services/paperApi";
import { PaperSearchResponse } from "../../utils/types/apiTypes";
import SearchResults from "./SearchResult";

const SearchResultsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<PaperSearchResponse>({
    consolidated_summary: "",
    token_usage_consolidated: { input: null, output: null },
    papers: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const searchResults = await searchPapers(query);
      setResults(searchResults); // Handle results in parent component
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch} // Pass only the search handler
        loading={loading}
      />

      {/* Render results here */}
      <SearchResults results={results} />
    </div>
  );
};

export default SearchResultsPage;
// // src/components/Search/SearchResultsPage.tsx (updated)
// import React, { useState } from 'react';
// // import SearchBar from './SearchBar';
// import PaperSelection from './PaperSelection';
// import ChatInitialization from '../chat/ChatInitialization';
// import { PaperSearchResponse, SelectedPaper } from '../../utils/types/apiTypes';
// import SearchBar from '../SearchBar';

// const SearchResultsPage: React.FC = () => {
//   const [results, setResults] = useState<PaperSearchResponse>(/*...*/);
//   const [selectedPapers, setSelectedPapers] = useState<SelectedPaper[]>([]);
//   const [chatMode, setChatMode] = useState(false);
//   const [chat_session_id, setChatSessionId] = useState<number | null>(null);

//   const handlePaperSelection = (papers: SelectedPaper[]) => {
//     setSelectedPapers(papers);
//     setChatMode(true);
//   };

//   const handleChatStart = (paperIds: number[]) => {
//     // Here you would typically:
//     // 1. Create a new chat session with the selected papers
//     // 2. Navigate to the chat interface
//     console.log('Starting chat with papers:', paperIds);
//     // For now, we'll just simulate a session ID
//     const newSessionId = Math.floor(Math.random() * 10000);
//     setChatSessionId(newSessionId);
//     // You would normally navigate to your chat page here
//     // navigate(`/chat/${newSessionId}`);
//   };

//   return (
//     <div className="search-results-page">
//       <SearchBar/>

//       {!chatMode ? (
//         <>
//           {/* Existing results display */}
//           <PaperSelection
//             papers={results.papers}
//             onSelectionConfirm={handlePaperSelection}
//           />
//         </>
//       ) : (
//         <ChatInitialization
//           selectedPapers={selectedPapers}
//           onChatStart={handleChatStart}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;
