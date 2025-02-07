import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

/**
 * QuartileBoard component for the Quartile Generator app
 */
const QuartileBoard = ({ tiles, selectedTiles, onTileSelect }) => {
  return (
    <Box sx={{ display: 'grid', gap: 2, my: 3 }}>
      {Array(5).fill(null).map((_, row) => (
        <Box
          key={row}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2
          }}
        >
          {Array(4).fill(null).map((_, col) => {
            const index = row * 4 + col;
            const tileContent = tiles[index];
            return (
              <Paper
                key={col}
                elevation={2}
                sx={{
                  p: 2,
                  backgroundColor: selectedTiles.includes(index) ? '#e3f2fd' : '#fff',
                  cursor: tileContent ? 'pointer' : 'default',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '80px'
                }}
                onClick={() => tileContent && onTileSelect(index)}
              >
                <Typography variant="h6">
                  {tileContent}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default QuartileBoard;
