import { renderHook, act } from '@testing-library/react';
import { BoardProvider, useBoards } from '../BoardContext';

describe('BoardContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <BoardProvider>{children}</BoardProvider>;

  it('should initialize with empty boards', () => {
    const { result } = renderHook(() => useBoards(), { wrapper });
    expect(result.current.savedBoards).toHaveLength(0);
  });

  it('should save a board', () => {
    const { result } = renderHook(() => useBoards(), { wrapper });

    act(() => {
      result.current.saveBoard('Test Board', ['tile1', 'tile2']);
    });

    expect(result.current.savedBoards).toHaveLength(1);
    expect(result.current.savedBoards[0].name).toBe('Test Board');
    expect(result.current.savedBoards[0].tiles).toEqual(['tile1', 'tile2']);
  });

  it('should delete a board', () => {
    const { result } = renderHook(() => useBoards(), { wrapper });

    act(() => {
      result.current.saveBoard('Test Board', ['tile1', 'tile2']);
    });

    const boardId = result.current.savedBoards[0].id;

    act(() => {
      result.current.deleteBoard(boardId);
    });

    expect(result.current.savedBoards).toHaveLength(0);
  });
});
