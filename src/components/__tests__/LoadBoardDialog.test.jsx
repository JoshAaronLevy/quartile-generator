import { render, screen, fireEvent } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import LoadBoardDialog from '../LoadBoardDialog';

describe('LoadBoardDialog', () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    onLoadBoard: jest.fn()
  };

  const mockBoards = [
    {
      id: 1,
      name: 'Test Board',
      tiles: ['a', 'b'],
      createdAt: new Date().toISOString()
    }
  ];

  const renderWithContext = (ui, contextValue) => {
    return render(
      <BoardContext.Provider value={contextValue}>
        {ui}
      </BoardContext.Provider>
    );
  };

  it('shows empty state when no boards are saved', () => {
    renderWithContext(<LoadBoardDialog {...mockProps} />, {
      savedBoards: [],
      deleteBoard: jest.fn(),
      saveBoard: jest.fn(),
      loadBoard: jest.fn()
    });
    expect(screen.getByText('No saved boards found')).toBeInTheDocument();
  });

  it('displays saved boards', () => {
    renderWithContext(<LoadBoardDialog {...mockProps} />, {
      savedBoards: mockBoards,
      deleteBoard: jest.fn(),
      saveBoard: jest.fn(),
      loadBoard: jest.fn()
    });
    expect(screen.getByText('Test Board')).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    renderWithContext(<LoadBoardDialog {...mockProps} />, {
      savedBoards: [],
      deleteBoard: jest.fn(),
      saveBoard: jest.fn(),
      loadBoard: jest.fn()
    });
    fireEvent.click(screen.getByText('Close'));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onLoadBoard when clicking a board', () => {
    const mockDeleteBoard = jest.fn();
    renderWithContext(<LoadBoardDialog {...mockProps} />, {
      savedBoards: mockBoards,
      deleteBoard: mockDeleteBoard,
      saveBoard: jest.fn(),
      loadBoard: jest.fn()
    });

    fireEvent.click(screen.getByText('Test Board'));
    expect(mockProps.onLoadBoard).toHaveBeenCalledWith(['a', 'b']);
  });

  it('calls deleteBoard when clicking delete button', () => {
    const mockDeleteBoard = jest.fn();
    renderWithContext(<LoadBoardDialog {...mockProps} />, {
      savedBoards: mockBoards,
      deleteBoard: mockDeleteBoard,
      saveBoard: jest.fn(),
      loadBoard: jest.fn()
    });

    fireEvent.click(screen.getByLabelText('delete board'));
    expect(mockDeleteBoard).toHaveBeenCalledWith(1);
  });
});
