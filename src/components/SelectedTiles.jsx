import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

/**
 * SelectedTiles component for the Quartile Generator app
 * @returns {React.JSX.Element} The rendered application
 */
const SelectedTiles = ({ tiles, selectedIndices, onTileClick }) => {
  const rows = selectedIndices.reduce((acc, index, i) => {
    const rowIndex = Math.floor(i / 4);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(index);
    return acc;
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        mb: 3,
        minHeight: '100px',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {rows.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center'
          }}
        >
          {row.map((index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                p: 2,
                cursor: 'pointer',
                minWidth: '80px',
                display: 'flex',
                justifyContent: 'center'
              }}
              onClick={() => onTileClick(index)}
            >
              <Typography variant="h6">{tiles[index]}</Typography>
            </Paper>
          ))}
        </Box>
      ))}
    </Paper>
  );
};

export default SelectedTiles;
