// ChatInitializationWrapper.tsx
import { useNavigate } from "react-router-dom";
import ChatInitialization from "./ChatInitialization";

const ChatInitializationWrapper = () => {
  const navigate = useNavigate();

  // Simulate selected papers
  const selectedPapers = [
    { db_id: 1, name: "Paper A" },
    { db_id: 2, name: "Paper B" },
  ];

  const handleChatStart = (paperIds: number[]) => {
    const sessionId = Date.now(); // Unique session ID
    console.log("Navigating to chat with sessionId:", sessionId, "papers:", paperIds);

    navigate(`/chat/${sessionId}`, {
      state: { paperIds },
    });
  };

  return (
    <ChatInitialization
      selectedPapers={selectedPapers}
      onChatStart={handleChatStart}
    />
  );
};

export default ChatInitializationWrapper;
