import { TextField, InputAdornment, Button, CircularProgress } from '@mui/material';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ value, onChange, onSearch, loading }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      placeholder="Search research papers..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && onSearch()}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={20} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button 
              onClick={onSearch}
              disabled={loading || value.trim() === ''}
              variant="contained"
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </InputAdornment>
        )
      }}
    />
  );
}
