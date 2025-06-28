import { PaperSearchResponse, PaperSummary } from "./apiTypes";

// src/types/searchTypes.ts
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
  className?: string;
}

export interface PaperCardProps {
  paper: PaperSummary;
  onSave: () => void;
  className?: string;
}

export interface SearchResultsProps {
  results: PaperSearchResponse;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onNewSearch: (query: string) => void;
}
