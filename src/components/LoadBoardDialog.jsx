import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  DialogActions,
  Button
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useBoards } from '../context/BoardContext';

const LoadBoardDialog = ({ open, onClose, onLoadBoard }) => {
  const { savedBoards, deleteBoard } = useBoards();

  const handleLoad = (board) => {
    onLoadBoard(board.tiles);
    onClose();
  };

  const handleDelete = (e, boardId) => {
    e.stopPropagation();
    deleteBoard(boardId);

    if (savedBoards.length === 1) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Saved Boards</DialogTitle>
      <DialogContent>
        {savedBoards.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            No saved boards found
          </Typography>
        ) : (
          <List>
            {savedBoards.map((board) => (
              <ListItem
                key={board.id}
                button
                onClick={() => handleLoad(board)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <ListItemText
                  primary={board.name}
                  secondary={new Date(board.createdAt).toLocaleDateString()}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(e) => handleDelete(e, board.id)}
                    aria-label="delete board"
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadBoardDialog;
