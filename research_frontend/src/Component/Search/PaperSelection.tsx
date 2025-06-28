// src/components/Search/PaperSelection.tsx
import React, { useState } from "react";
import { PaperSummary } from "../../utils/types/apiTypes";
import { SelectedPaper } from "../../utils/types/apiTypes";

interface PaperSelectionProps {
  papers: PaperSummary[];
  onSelectionConfirm: (selected: SelectedPaper[]) => void;
}

const PaperSelection: React.FC<PaperSelectionProps> = ({
  papers,
  onSelectionConfirm,
}) => {
  const [selectedPapers, setSelectedPapers] = useState<SelectedPaper[]>([]);

  const togglePaperSelection = (paper: PaperSummary) => {
    setSelectedPapers((prev) => {
      const existingIndex = prev.findIndex((p) => p.db_id === paper.db_id);
      if (existingIndex >= 0) {
        return prev.filter((p) => p.db_id !== paper.db_id);
      } else {
        return [
          ...prev,
          {
            db_id: paper.db_id,
            paper_id: paper.paper_id,
            title: paper.title,
            is_processed_for_chat: paper.is_processed_for_chat,
          },
        ];
      }
    });
  };

  const handleConfirm = () => {
    onSelectionConfirm(selectedPapers);
  };

  return (
    <div className="paper-selection">
      <h3>Select papers to chat with (max 5)</h3>
      <div className="paper-list">
        {papers.map((paper) => (
          <div
            key={paper.db_id}
            className={`paper-item ${
              selectedPapers.some((p) => p.db_id === paper.db_id)
                ? "selected"
                : ""
            }`}
            onClick={() => togglePaperSelection(paper)}
          >
            <input
              type="checkbox"
              checked={selectedPapers.some((p) => p.db_id === paper.db_id)}
              readOnly
            />
            <span className="paper-title">{paper.title}</span>
            {!paper.is_processed_for_chat && (
              <span className="processing-warning">(Processing required)</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleConfirm}
        disabled={selectedPapers.length === 0 || selectedPapers.length > 5}
      >
        {selectedPapers.length > 0
          ? `Chat with ${selectedPapers.length} selected papers`
          : "Select papers to chat"}
      </button>
      {selectedPapers.length > 5 && (
        <p className="error">Maximum 5 papers can be selected for chat</p>
      )}
    </div>
  );
};

export default PaperSelection;
