import { render, screen, fireEvent } from '@testing-library/react';
import { BoardProvider } from '../../context/BoardContext';
import SaveBoardDialog from '../SaveBoardDialog';

describe('SaveBoardDialog', () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    currentTiles: ['a', 'b', 'c']
  };

  const renderWithProvider = (component) => {
    return render(
      <BoardProvider>
        {component}
      </BoardProvider>
    );
  };

  it('renders dialog with input field', () => {
    renderWithProvider(<SaveBoardDialog {...mockProps} />);
    expect(screen.getByLabelText('Board Name')).toBeInTheDocument();
  });

  it('disables save button when input is empty', () => {
    renderWithProvider(<SaveBoardDialog {...mockProps} />);
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('enables save button when input has value', () => {
    renderWithProvider(<SaveBoardDialog {...mockProps} />);
    const input = screen.getByLabelText('Board Name');
    fireEvent.change(input, { target: { value: 'Test Board' } });
    expect(screen.getByText('Save')).not.toBeDisabled();
  });

  it('calls onClose when clicking cancel', () => {
    renderWithProvider(<SaveBoardDialog {...mockProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('saves board and closes dialog when clicking save', () => {
    renderWithProvider(<SaveBoardDialog {...mockProps} />);
    const input = screen.getByLabelText('Board Name');
    fireEvent.change(input, { target: { value: 'Test Board' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
