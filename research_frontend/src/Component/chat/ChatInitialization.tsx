// ChatInitialization.tsx
import React, { useEffect, useState } from "react";

interface SelectedPaper {
  db_id: number;
  name: string;
}

interface ChatInitializationProps {
  selectedPapers: SelectedPaper[];
  onChatStart: (paperIds: number[]) => void;
}

const ChatInitialization: React.FC<ChatInitializationProps> = ({
  selectedPapers,
  onChatStart,
}) => {
  const [processingStates, setProcessingStates] = useState<{
    [paperId: number]: string;
  }>({});
  const [allReady, setAllReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateProcessing = () => {
    const interval = setInterval(() => {
      const allProcessed = selectedPapers.every(
        (paper) => processingStates[paper.db_id] === "Ready for chat"
      );
      if (!allProcessed) {
        setProcessingStates((prevStates) => {
          const newStates = { ...prevStates };
          selectedPapers.forEach((paper) => {
            if (newStates[paper.db_id] !== "Ready for chat") {
              newStates[paper.db_id] = "Ready for chat";
            }
          });
          return newStates;
        });
      } else {
        clearInterval(interval);
        setAllReady(true);
        setIsProcessing(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const initialStates: { [paperId: number]: string } = {};
    selectedPapers.forEach((paper) => {
      initialStates[paper.db_id] = "Processing...";
    });
    setProcessingStates(initialStates);
    setIsProcessing(true);
    simulateProcessing();
  }, [selectedPapers]);

  const handleStartChat = () => {
    const ids = selectedPapers.map((p) => p.db_id);
    console.log("Starting chat with paper IDs:", ids);
    onChatStart(ids);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Preparing your papers</h2>
      {selectedPapers.map((paper) => (
        <div
          key={paper.db_id}
          className="border rounded p-3 mb-2 bg-gray-50 flex justify-between"
        >
          <span>{paper.name}</span>
          <span>
            {processingStates[paper.db_id] === "Ready for chat" ? (
              <span className="text-green-600 font-medium">✅ Ready</span>
            ) : (
              <span className="text-yellow-600">⏳ Processing...</span>
            )}
          </span>
        </div>
      ))}

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleStartChat}
        disabled={!allReady || isProcessing}
      >
        Start Chat Session
      </button>
    </div>
  );
};

export default ChatInitialization;
