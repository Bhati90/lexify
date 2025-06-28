import {
  Box,
  Typography,
  Button,
  Fade,
  Grid,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from '@mui/material';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import SearchBar from '../Component/SearchBar';
import Summary from '../Component/Summary';
import PaperTable from '../Component/PaperTable';
import { usePapers } from '../hooks/usePapers';
import FeatureHighlights from '@/Component/FeatureHighlights';
import Modal from '@/Component/common/Modal';
import ChatInterface from '@/Component/chat/ChatInterface';

const drawerWidth = 280;

export default function ResearchSearchApp() {
  const {
    papers, loading, search, summary,
    searchPerformed, toggleSelection,
    toggleAllSelection, selectedCount, paperMetadata
  } = usePapers();

  const [query, setQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

  const handleChatOpen = () => {
    if (selectedCount > 0) {
      const sessionId = Date.now();
      setChatSessions([{ id: sessionId, title: `Chat ${chatSessions.length + 1}` }, ...chatSessions]);
      setActiveSessionId(sessionId);
      setIsChatOpen(true);
    } else {
      alert("Please select at least one paper to start a chat.");
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleSessionSelect = (sessionId: number) => {
    setActiveSessionId(sessionId);
    setIsChatOpen(true);
  };

  return (
    <Box display="flex">
      {/* Sidebar Chat History */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', p: 2 }
        }}
      >
        <Toolbar />
        <Typography variant="h6" mb={2}>Chat History</Typography>
        <Divider />
        <List>
          {chatSessions.map(session => (
            <ListItem
              button
              key={session.id}
              selected={activeSessionId === session.id}
              onClick={() => handleSessionSelect(session.id)}
            >
              <ListItemText primary={session.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, maxWidth: "100%" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={() => query.trim() && search(query)}
              loading={loading}
            />
          </Grid>

          {searchPerformed ? (
            <>
              <Grid item xs={12}>
                <Fade in timeout={800} mountOnEnter unmountOnExit>
                  <div>
                    <Summary sentences={summary} />
                  </div>
                </Fade>
              </Grid>

              <Grid item xs={12}>
                <Fade in timeout={1000} mountOnEnter unmountOnExit>
                  <div>
                    <Box>
                      <Typography variant="h6">Results ({papers?.length})</Typography>
                      {selectedCount > 0 && (
                        <Box display="flex" justifyContent="flex-end" my={2}>
                          <Button
                            startIcon={<FileText />}
                            variant="contained"
                            onClick={handleChatOpen}
                          >
                            Chat with Selected ({selectedCount})
                          </Button>
                        </Box>
                      )}
                      <PaperTable
                        papers={papers}
                        toggleAllSelection={toggleAllSelection}
                        toggleSelection={toggleSelection}
                      />
                    </Box>
                  </div>
                </Fade>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <FeatureHighlights />
            </Grid>
          )}
        </Grid>

        {/* Fullscreen Chat Modal */}
        <Modal
          isOpen={isChatOpen}
          onClose={closeChat}
        >
          <Box display="flex" height="100%">
            <Box flexGrow={1}>
              {activeSessionId !== null && (
                <ChatInterface paperMetadata={paperMetadata} sessionId={activeSessionId} />
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
