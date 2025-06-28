import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Checkbox,
  Button,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Fade,
  Grow,
  useTheme,
  alpha
} from '@mui/material';
import { Search, FileText, Download, Eye } from 'lucide-react';

// Types
interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  publisher: string;
  summary: string;
  tags: string[];
  selected: boolean;
}

// Sample data
const INITIAL_DATA: ResearchPaper[] = [
  {
    id: '1',
    title: 'Deep Residual Learning for Image Recognition',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    year: 2016,
    publisher: 'IEEE Conference on Computer Vision and Pattern Recognition',
    summary: 'Introduced the concept of residual learning and ResNet architecture, which enabled training much deeper neural networks by using skip connections to address the degradation problem, significantly advancing the field of computer vision.',
    tags: ['residual networks', 'deep learning', 'computer vision', 'image recognition', 'neural networks'],
    selected: false
  },
  {
    id: '2',
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
    year: 2012,
    publisher: 'Advances in Neural Information Processing Systems',
    summary: 'Introduced AlexNet, a deep convolutional neural network that significantly outperformed previous methods on the ImageNet competition, catalyzing the deep learning revolution in computer vision.',
    tags: ['AlexNet', 'CNN', 'deep learning', 'computer vision', 'image classification'],
    selected: false
  },
  {
    id: '3',
    title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation',
    authors: ['Olaf Ronneberger', 'Philipp Fischer', 'Thomas Brox'],
    year: 2015,
    publisher: 'Medical Image Computing and Computer-Assisted Intervention',
    summary: 'Introduced the U-Net architecture, a convolutional network design with a U-shaped structure that enables precise image segmentation with limited training data, becoming a cornerstone for biomedical image analysis.',
    tags: ['U-Net', 'image segmentation', 'biomedical imaging', 'convolutional networks', 'deep learning'],
    selected: false
  }
];

export default function ResearchSearchApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [papers, setPapers] = useState<ResearchPaper[]>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [summarySentences, setSummarySentences] = useState<string[]>([]);
  const theme = useTheme();

  // Count selected papers
  const selectedCount = papers.filter(paper => paper.selected).length;

  // Mock API call
  const searchPapers = async (query: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Reset paper selections
    const updatedPapers = INITIAL_DATA.map(paper => ({
      ...paper,
      selected: false
    }));
    
    setPapers(updatedPapers);
    setLoading(false);
    setSearchPerformed(true);
    
    // Generate summary sentences
    setSummarySentences([
      `Found ${updatedPapers.length} papers related to "${query}".`,
      `The research spans from 2012 to 2016.`,
      `Key themes include deep learning, computer vision, neural networks.`,
      `The most cited paper is "Deep Residual Learning for Image Recognition" with 93000 citations.`
    ]);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      searchPapers(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSelection = (id: string) => {
    setPapers(papers.map(paper => 
      paper.id === id ? { ...paper, selected: !paper.selected } : paper
    ));
  };

  const toggleAllSelection = (checked: boolean) => {
    setPapers(papers.map(paper => ({ ...paper, selected: checked })));
  };

  const allSelected = papers.length > 0 && papers.every(paper => paper.selected);
  const someSelected = papers.some(paper => paper.selected) && !allSelected;

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
      {/* Search Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: alpha(theme.palette.primary.main, 0.03),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Research Paper Search
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Search for research papers (e.g. 'deep learning', 'computer vision')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  variant="contained" 
                  onClick={handleSearch}
                  disabled={loading || searchQuery.trim() === ''}
                  sx={{ 
                    borderRadius: '8px',
                    px: 3,
                    textTransform: 'none'
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                </Button>
              </InputAdornment>
            ),
            sx: { 
              borderRadius: 2,
              background: 'white',
              '&.Mui-focused': {
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`
              }
            }
          }}
          sx={{ mb: 2 }}
        />
      </Paper>
      
      {/* Summary Section */}
      {searchPerformed && (
        <Fade in={searchPerformed} timeout={800}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
              Summary
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {summarySentences.map((sentence, index) => (
                <Grow in key={index} timeout={(index + 1) * 300}>
                  <Box component="span" display="block" mb={0.5}>
                    {sentence}
                  </Box>
                </Grow>
              ))}
            </Typography>
          </Paper>
        </Fade>
      )}
      
      {/* Results Section */}
      {searchPerformed && (
        <Fade in={searchPerformed} timeout={1000}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Results ({papers.length})
              </Typography>
              
              {selectedCount > 0 && (
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<FileText size={18} />}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Chat with Selected ({selectedCount})
                </Button>
              )}
            </Box>
            
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ width: '48px' }}>
                      <Checkbox
                        indeterminate={someSelected}
                        checked={allSelected}
                        onChange={(e) => toggleAllSelection(e.target.checked)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>PAPER</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>SUMMARY</TableCell>
                    <TableCell align="center" sx={{ width: '100px', fontWeight: 600 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {papers.map((paper, index) => (
                    <Grow in key={paper.id} timeout={(index + 1) * 200}>
                      <TableRow 
                        hover
                        sx={{ 
                          '&:hover': { 
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                          }
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={paper.selected}
                            onChange={() => toggleSelection(paper.id)}
                          />
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          <Typography variant="subtitle1" fontWeight={500}>
                            {paper.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {paper.authors.join(', ')} ({paper.year})
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            {paper.publisher}
                          </Typography>
                          
                          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {paper.tags.map(tag => (
                              <Chip 
                                key={tag} 
                                label={tag} 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                  borderRadius: 1,
                                  fontSize: '0.7rem', 
                                  height: '22px'
                                }} 
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          <Typography variant="body2">
                            {paper.summary}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ 
                              minWidth: 'auto', 
                              borderRadius: 2,
                              mb: 1,
                              width: '100%'
                            }}
                            startIcon={<Eye size={16} />}
                          >
                            View Source
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            color="primary"
                            sx={{ 
                              minWidth: 'auto', 
                              borderRadius: 2,
                              width: '100%'
                            }}
                            startIcon={<Download size={16} />}
                          >
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    </Grow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fade>
      )}
    </Box>
  );
}