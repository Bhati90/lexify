// src/components/Search/PaperCard.tsx
import React from "react";
import { PaperSummary } from "../../utils/types/apiTypes";

interface PaperCardProps {
  paper: PaperSummary;
  onSave: () => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, onSave }) => {
  return (
    <div className="paper-card">
      <div className="paper-card-header">
        <h3>{paper.title}</h3>
        <div className="paper-actions">
          <button onClick={onSave} className="save-button">
            Save
          </button>
          <a
            href={paper.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="download-button"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="paper-meta">
        <span className="authors">{paper.authors.join(", ")}</span>
        <span className="published-date">
          Published: {new Date(paper.published).toLocaleDateString()}
        </span>
        <span className="source">Source: {paper.source}</span>
      </div>

      <div className="paper-content">
        <div className="abstract">
          <h4>Abstract</h4>
          <p>{paper.abstract}</p>
        </div>

        <div className="summary">
          <h4>Summary</h4>
          <p>{paper.individual_summary}</p>
        </div>
      </div>

      {paper.is_processed_for_chat && (
        <div className="chat-availability">Available for Q&A</div>
      )}
    </div>
  );
};

export default PaperCard;
