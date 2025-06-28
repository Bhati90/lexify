import { Paper, Typography } from '@mui/material';
import { formatChatContent } from '@/utils/formatUtils';

interface SummaryProps {
  sentences: string;
}

export default function Summary({ sentences }: SummaryProps) {
  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Summary</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>{formatChatContent(sentences)}</Typography>
    </Paper>
  );
}
