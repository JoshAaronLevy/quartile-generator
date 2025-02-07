import React, { createContext, useContext, useState, useEffect } from 'react';

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [savedBoards, setSavedBoards] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('quartilesBoards');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever boards change
  useEffect(() => {
    localStorage.setItem('quartilesBoards', JSON.stringify(savedBoards));
  }, [savedBoards]);

  const saveBoard = (name, tiles) => {
    setSavedBoards(prev => [...prev, {
      id: Date.now(),
      name,
      tiles,
      createdAt: new Date().toISOString()
    }]);
  };

  const deleteBoard = (id) => {
    setSavedBoards(prev => prev.filter(board => board.id !== id));
  };

  const loadBoard = (id) => {
    return savedBoards.find(board => board.id === id);
  };

  return (
    <BoardContext.Provider value={{
      savedBoards,
      saveBoard,
      deleteBoard,
      loadBoard
    }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoards() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoards must be used within a BoardProvider');
  }
  return context;
}
