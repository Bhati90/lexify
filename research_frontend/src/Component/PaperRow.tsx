// import { TableRow, TableCell, Checkbox, Typography, Box, Chip, Button, Grow } from '@mui/material';
// import { Eye, Download } from 'lucide-react';
// import { ResearchPaper } from '../utils/types/research';

// interface PaperRowProps {
//   paper: ResearchPaper;
//   onToggle: () => void;
//   animationDelay: number;
// }

// export default function PaperRow({ paper, onToggle, animationDelay }: PaperRowProps) {
//   return (
//     <Grow in timeout={(animationDelay + 1) * 200}>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox checked={paper.selected} onChange={onToggle} />
//         </TableCell>
//         <TableCell>
//           <Typography fontWeight={500}>{paper.title}</Typography>
//           <Typography variant="body2" color="text.secondary">{paper.authors.join(', ')} ({paper.year})</Typography>
//           <Typography variant="caption" display="block">{paper.publisher}</Typography>
//           <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
//             {paper.tags.map(tag => (
//               <Chip key={tag} label={tag} size="small" variant="outlined" />
//             ))}
//           </Box>
//         </TableCell>
//         <TableCell>
//           <Typography variant="body2">{paper.summary}</Typography>
//         </TableCell>
//         <TableCell align="center">
//           <Button variant="outlined" startIcon={<Eye size={16} />} fullWidth>View</Button>
//           <Button variant="text" color="primary" startIcon={<Download size={16} />} fullWidth>Download</Button>
//         </TableCell>
//       </TableRow>
//     </Grow>
//   );
// }


// Component/PaperRow.tsx
import { TableRow, TableCell, Checkbox, Tooltip, IconButton, Link } from '@mui/material';
import { FileText, Download, Star } from 'lucide-react';
import { ResearchPaper } from '../utils/types/research';
import { useState } from 'react';

interface PaperRowProps {
  paper: ResearchPaper;
  onToggle: () => void;
  animationDelay: number;
}

export default function PaperRow({ paper, onToggle, animationDelay }: PaperRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TableRow
      hover
      sx={{
        opacity: 0,
        animation: 'fadeIn 0.5s forwards',
        animationDelay: `${animationDelay * 0.05}s`,
        '@keyframes fadeIn': {
          to: { opacity: 1 }
        },
        backgroundColor: paper.selected ? 'action.selected' : 'inherit'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={paper.selected}
          onChange={onToggle}
        />
      </TableCell>
      <TableCell>
        <Link 
          href={paper.pdfUrl} 
          target="_blank" 
          rel="noopener"
          sx={{ fontWeight: 'medium' }}
        >
          {paper.title}
        </Link>
      </TableCell>
      <TableCell>
        <Tooltip title={paper.authors}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '180px' }}>
            {paper.authors}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell>{new Date(paper.publishedDate).toLocaleDateString()}</TableCell>
      <TableCell>{paper.source}</TableCell>
      <TableCell>
        <Tooltip title={paper.summary}>
          <span style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {paper.summary}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        {isHovered && (
          <>
            <Tooltip title="Chat with this paper">
              <IconButton size="small">
                <FileText size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download PDF">
              <IconButton size="small" href={paper.pdfUrl} download>
                <Download size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bookmark">
              <IconButton size="small">
                <Star size={18} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}