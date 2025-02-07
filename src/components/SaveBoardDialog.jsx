import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { useBoards } from '../context/BoardContext';

const SaveBoardDialog = ({ open, onClose, currentTiles }) => {
  const [boardName, setBoardName] = useState('');
  const { saveBoard } = useBoards();

  const handleSave = () => {
    if (!boardName.trim()) return;
    saveBoard(boardName, currentTiles);
    setBoardName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Current Board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Board Name"
          fullWidth
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!boardName.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveBoardDialog;
