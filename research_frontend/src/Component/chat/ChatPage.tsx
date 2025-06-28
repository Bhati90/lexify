// ChatPage.tsx
import { useLocation, useParams } from "react-router-dom";

const ChatPage = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const paperIds = (location.state as { paperIds: number[] })?.paperIds || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Chat Session: {sessionId}</h1>
      <p className="mt-2">Chatting with paper IDs: {paperIds.join(", ")}</p>
    </div>
  );
};

export default ChatPage;
