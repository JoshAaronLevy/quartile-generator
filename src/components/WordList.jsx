import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Pagination,
  Box,
  Grid2,
  Chip,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';

const ITEMS_PER_PAGE = 75;
const WORDS_PER_ROW = 3;

/**
 * Displays a list of possible words based on selected tiles
 */
const WordList = ({ words, isLoading, totalPossibilities }) => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredWords = () => {
    if (activeTab === 'all') {
      return [
        ...(words.twoTiles || []),
        ...(words.threeTiles || []),
        ...(words.fourTiles || [])
      ];
    }
    return words[activeTab] || [];
  };

  const filteredWords = getFilteredWords();
  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: document.querySelector('#word-list').offsetTop, behavior: 'smooth' });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const getPageWords = () => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredWords.slice(start, end);
  };

  const getTotalWordCount = () => {
    return (words.twoTiles?.length || 0) +
      (words.threeTiles?.length || 0) +
      (words.fourTiles?.length || 0);
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
          {[...Array(WORDS_PER_ROW - rowWords.length)].map((_, index) => (
            <Grid2 xs={4} key={`empty-${index}`} />
          ))}
        </Grid2>
      );
    }
    return rows;
  };

  const renderTabs = () => (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      sx={{ mb: 2 }}
      centered
    >
      <Tab
        label={`All Words (${getTotalWordCount()})`}
        value="all"
      />
      <Tab
        label={`2 Tiles (${words.twoTiles?.length || 0})`}
        value="twoTiles"
      />
      <Tab
        label={`3 Tiles (${words.threeTiles?.length || 0})`}
        value="threeTiles"
      />
      <Tab
        label={`4 Tiles (${words.fourTiles?.length || 0})`}
        value="fourTiles"
      />
    </Tabs>
  );

  return (
    <Paper elevation={2} sx={{ mt: 3 }} id="word-list">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Possible Words {getTotalWordCount() > 0 && `(${getTotalWordCount()} total)`}
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
        ) : getTotalWordCount() > 0 ? (
          <>
            {renderTabs()}
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
