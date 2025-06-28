// Component/PaperTable.tsx
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TableSortLabel } from '@mui/material';
import PaperRow from './PaperRow';
import { ResearchPaper } from '../utils/types/research';

interface PaperTableProps {
  papers: ResearchPaper[];
  toggleAllSelection: (checked: boolean) => void;
  toggleSelection: (id: string) => void;
}

export default function PaperTable({ papers, toggleAllSelection, toggleSelection }: PaperTableProps) {
  const allSelected = papers?.length > 0 && papers.every(p => p.selected);
  const someSelected = papers?.some(p => p.selected) && !allSelected;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" sx={{ width: '48px' }}>
              <Checkbox
                indeterminate={someSelected}
                checked={allSelected}
                onChange={(e) => toggleAllSelection(e.target.checked)}
              />
            </TableCell>
            <TableCell sx={{ minWidth: '250px' }}>
              <TableSortLabel>
                Paper Title
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ minWidth: '180px' }}>Authors</TableCell>
            <TableCell sx={{ minWidth: '120px' }}>Published</TableCell>
            <TableCell sx={{ minWidth: '100px' }}>Source</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell align="center" sx={{ width: '120px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {papers?.map((paper, index) => (
            <PaperRow 
              key={paper.id}
              paper={paper}
              onToggle={() => toggleSelection(paper.id)}
              animationDelay={index}
            />
          ))}
          {papers?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                No papers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}