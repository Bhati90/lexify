import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  Search, MessageCircle, Lock, Download,
  BookOpen, Cloud, Sparkles, History
} from 'lucide-react';

const features = [
  {
    title: 'Smart Research Querying',
    description: 'Search academic papers from ArXiv and Semantic Scholar using natural language.',
    icon: <Search size={28} color="#1976d2" />
  },
  {
    title: 'AI-Powered Summarization',
    description: 'Get concise summaries and a synthesized overview of multiple papers.',
    icon: <Sparkles size={28} color="#1976d2" />
  },
  {
    title: 'PDF Download & Text Extraction',
    description: 'Automatically download PDFs and extract clean, readable text.',
    icon: <Download size={28} color="#1976d2" />
  },
  {
    title: 'Interactive Paper Chat (RAG)',
    description: 'Ask questions and chat with selected papers using advanced AI.',
    icon: <MessageCircle size={28} color="#1976d2" />
  },
  {
    title: 'Citation-Aware Answers',
    description: 'Responses include clickable citations referencing source papers.',
    icon: <BookOpen size={28} color="#1976d2" />
  },
  {
    title: 'Persistent Chat History',
    description: 'Your previous research and chats are saved and accessible.',
    icon: <History size={28} color="#1976d2" />
  },
  {
    title: 'Secure Authentication',
    description: 'Login/register to access personalized research sessions securely.',
    icon: <Lock size={28} color="#1976d2" />
  },
  {
    title: 'Cloud-Ready Deployment',
    description: 'Optimized for deployment on platforms like Render.com.',
    icon: <Cloud size={28} color="#1976d2" />
  }
];

export default function FeatureHighlights() {

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
        🌟 Explore What You Can Do
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                {feature.icon}
                <Typography variant="subtitle1" fontWeight="bold">
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
