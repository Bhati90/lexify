// utils/types/research.ts
export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  summary: string;
  publishedDate: string;
  pdfUrl: string;
  selected: boolean;
  source: string;
  tags: string[];
  db_id:number;
  is_processed_for_chat:boolean;
}