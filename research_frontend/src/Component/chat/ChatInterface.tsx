// // src/components/Chat/ChatInterface.tsx
import React, { useState } from "react";
// import { chatWithPapers } from "../../services/ragApi";
import { ApiError, ChatMessage } from "../../utils/types/apiTypes";
import { chatWithPapers } from "../../services/ragApi";
import { formatChatContent } from "@/utils/formatUtils";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PaperMetadata {
  db_id: number;
  is_processed_for_chat: boolean;
}

interface ChatInterfaceProps {
  paperMetadata: PaperMetadata[];
  sessionId: number;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  paperMetadata,
  sessionId,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      session_id: sessionId,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null); // Clear previous errors

    const processedPaperIds = paperMetadata
      .filter(p => p.is_processed_for_chat)
      .map(p => p.db_id);
      console.log(processedPaperIds);

    const unprocessedPaperIds = paperMetadata
      .filter(p => !p.is_processed_for_chat)
      .map(p => p.db_id);
    const lastSessionId = messages.length > 0 ? messages[messages.length - 1].session_id : null;
    console.log(unprocessedPaperIds);

    try {
      const response = lastSessionId !== null
        ? await chatWithPapers(input, processedPaperIds, lastSessionId)
        : await chatWithPapers(input, processedPaperIds);

      console.log("response", response);

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        session_id: response.chat_session_id,
        role: "assistant",
        content: response.response,
        timestamp: new Date().toISOString(),
        sources: response.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const error = err as ApiError;
      setError("Failed to get response. Please try again.");
      console.error("Processing error:", error);
      // Remove the user message if the request failed
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Chatting with {paperMetadata.length} Papers
        </Typography>

        {error && (
          <Alert
            severity="error"
            action={
              <IconButton color="inherit" size="small" onClick={() => setError(null)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: msg.role === "user" ? "primary.light" : "grey.100",
              }}
            >
              <Typography variant="body1">{formatChatContent(msg.content)}</Typography>
              {msg.role === "assistant" && msg.sources && (
                <Box mt={1}>
                  <Typography variant="subtitle2">Sources:</Typography>
                  {Object.entries(msg.sources).map(([paperId, source]) => (
                    <Box key={paperId} sx={{ pl: 1, mt: 0.5 }}>
                      <Typography variant="body2" fontWeight="bold">{source.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {source.text.slice(0, 150)}...
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <CircularProgress size={24} />
              <Typography variant="body2" color="text.secondary">
                Thinking...
              </Typography>
            </Box>
          )}
        </Box>

        <form onSubmit={handleSendMessage}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Ask about the selected papers..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              variant="outlined"
            />
            <Button type="submit" variant="contained" disabled={isLoading}>
              Send
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ChatInterface;