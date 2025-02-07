import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Pagination,
  Box,
  Grid2,
  Chip,
  CircularProgress
} from '@mui/material';

const ITEMS_PER_PAGE = 75; // 25 rows * 3 words per row
const WORDS_PER_ROW = 3;

/**
 * Displays a list of possible words based on selected tiles
 */
const WordList = ({ words, isLoading, totalPossibilities }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: document.querySelector('#word-list').offsetTop, behavior: 'smooth' });
  };

  const getPageWords = () => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return words.slice(start, end);
  };

  const renderWordGrid = () => {
    const pageWords = getPageWords();
    const rows = [];

    for (let i = 0; i < pageWords.length; i += WORDS_PER_ROW) {
      const rowWords = pageWords.slice(i, i + WORDS_PER_ROW);
      rows.push(
        <Grid2 container spacing={2} key={i} sx={{ mb: 1 }}>
          {rowWords.map((word, index) => (
            <Grid2 xs={4} key={index}>
              <Chip
                label={word}
                variant="outlined"
                sx={{
                  width: '100%',
                  height: 'auto',
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    padding: '8px',
                  }
                }}
              />
            </Grid2>
          ))}
          {/* Fill empty spaces in last row */}
          {[...Array(WORDS_PER_ROW - rowWords.length)].map((_, index) => (
            <Grid2 xs={4} key={`empty-${index}`} />
          ))}
        </Grid2>
      );
    }
    return rows;
  };

  return (
    <Paper elevation={2} sx={{ mt: 3 }} id="word-list">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Possible Words {words.length > 0 && `(${words.length} total)`}
        </Typography>

        {isLoading ? (
          <Box
            sx={{
              minHeight: '750px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <CircularProgress size={60} />
            <Typography variant="h6" color="text.secondary">
              Analyzing {totalPossibilities.toLocaleString()} possible combinations...
            </Typography>
          </Box>
        ) : words.length > 0 ? (
          <>
            <Box sx={{ minHeight: '750px' }}>
              {renderWordGrid()}
            </Box>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <Typography variant="body1" sx={{ py: 2 }}>
            Select tiles to see possible word combinations
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default WordList;
