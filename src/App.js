import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Button,
  TextField
} from '@mui/material';
import QuartileBoard from './components/QuartileBoard';
import SelectedTiles from './components/SelectedTiles';
import WordList from './components/WordList';
import { generateCombinations, calculateTotalPossibilities } from './helpers/utils';
import './App.sass';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

/**
 * Main application component for the Quartile Generator app
 * @returns {React.JSX.Element} The rendered application
 */
function App() {
  const [tiles, setTiles] = useState(Array(20).fill(''));
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [possibleWords, setPossibleWords] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [totalPossibilities, setTotalPossibilities] = useState(0);
  const [newTileText, setNewTileText] = useState('');

  const handleAddTile = () => {
    if (!newTileText.trim()) return;

    const emptyIndex = tiles.findIndex(tile => !tile);
    if (emptyIndex === -1) return; // board is full

    const newTiles = [...tiles];
    newTiles[emptyIndex] = newTileText.toLowerCase().trim();
    setTiles(newTiles);
    setNewTileText('');
  };

  const handleTileSelect = (index) => {
    // Only allow selecting tiles that have content
    if (!tiles[index]) return;

    setSelectedTiles(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
    setPossibleWords([]);
  };

  const handleClearSelection = () => {
    setSelectedTiles([]);
    setPossibleWords([]);
    setTotalPossibilities(0);
  };

  const handleAnalyze = () => {
    if (selectedTiles.length === 0) return;

    setIsAnalyzing(true);
    const totalCombinations = calculateTotalPossibilities(selectedTiles.length);
    setTotalPossibilities(totalCombinations);

    const selectedTileContents = selectedTiles.map(index => tiles[index]);
    const combinations = generateCombinations(selectedTileContents);
    setPossibleWords(combinations);
    setIsAnalyzing(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Quartile Generator
        </Typography>

        <Box sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TextField
            value={newTileText}
            onChange={(e) => setNewTileText(e.target.value)}
            label="New Tile Letters"
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 4 }}
          />
          <Button
            variant="contained"
            onClick={handleAddTile}
            disabled={!newTileText.trim()}
          >
            Add Tile
          </Button>
        </Box>

        <SelectedTiles
          tiles={tiles}
          selectedIndices={selectedTiles}
          onTileClick={handleTileSelect}
        />

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 3
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAnalyze}
            disabled={selectedTiles.length === 0 || isAnalyzing}
            size="large"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Selected Tiles'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearSelection}
            disabled={selectedTiles.length === 0}
            size="large"
          >
            Clear Selection
          </Button>
        </Box>

        <QuartileBoard
          tiles={tiles}
          selectedTiles={selectedTiles}
          onTileSelect={handleTileSelect}
        />

        <WordList
          words={possibleWords}
          isLoading={isAnalyzing}
          totalPossibilities={totalPossibilities}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
