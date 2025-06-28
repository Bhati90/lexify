// src/types/apiTypes.ts

// Authentication Types
export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  username_or_email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user_id: number;
  username: string;
}

export interface AuthCheckResponse {
  logged_in_as: string;
  user_id: number;
}

// Papers Types
export interface PaperSearchQuery {
  query: string;
}

// src/utils/types/apiTypes.ts (or wherever your types are defined)
export interface PaperSummary {
  db_id: number;
  paper_id: string;
  title: string;
  authors: string[];
  published: string;
  pdf_url: string;
  abstract: string;
  individual_summary: string;
  source: string;
  is_processed_for_chat: boolean;
  qdrant_collection_name: string | null; // Assuming this might also be in the summary
}
export interface PaperSearchResponse {
  consolidated_summary: string;
  token_usage_consolidated: { input: number | null; output: number | null };
  papers: PaperSummary[];
}

export interface PaperStatusResponse {
  paper_id: string;
  db_id: number;
  title: string;
  downloaded_at: string | null;
  text_extracted_at: string | null;
  cleaned_text_at: string | null;
  indexed_at: string | null;
  qdrant_collection_name: string | null;
  is_ready_for_chat: boolean;
  processing_status_notes: string;
}

// Chat Types
export interface ChatRequest {
  query: string;
  selected_paper_ids: number[];
  session_id?: number;
}

export interface ChatSourceChunk {
  chunk_id: number;
  score: number;
  text: string;
}

export interface ChatSource {
  title: string;
  text: string;
  _chunks: ChatSourceChunk[];
}

export interface ChatResponse {
  chat_session_id: number;
  response: string;
  sources: Record<string, ChatSource>;
  token_usage: {
    input: number | null;
    output: number | null;
    total_tokens: number | null;
  };
}

export interface ChatSession {
  id: number;
  session_name: string;
  created_at: string;
  updated_at: string;
  paper_ids_in_session: number[];
}

export interface ChatMessage {
  id: number;
  session_id: number | null;
  timestamp: string;
  role: "user" | "assistant";
  content: string;
  sources?: Record<string, ChatSource>;
}

export interface ChatMessagesResponse {
  session_id: number;
  session_name: string;
  associated_paper_titles: string[];
  messages: ChatMessage[];
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}
// src/types/apiTypes.ts
export interface SelectedPaper {
  db_id: number;
  paper_id: string;
  title: string;
  is_processed_for_chat: boolean;
}

export interface ChatInitializationProps {
  selectedPapers: SelectedPaper[];
  onChatStart: (sessionId: number) => void;
}
