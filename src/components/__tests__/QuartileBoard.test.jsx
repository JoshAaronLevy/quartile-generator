import { render, fireEvent, screen } from '@testing-library/react';
import QuartileBoard from '../QuartileBoard';

describe('QuartileBoard', () => {
  const mockProps = {
    tiles: Array(20).fill(''),
    selectedTiles: [],
    onTileSelect: jest.fn()
  };

  it('renders 20 tiles', () => {
    render(<QuartileBoard {...mockProps} />);
    const tiles = screen.getAllByTestId(/^tile-\d+$/);
    expect(tiles).toHaveLength(20);
  })

  it('shows tile content when provided', () => {
    const props = {
      ...mockProps,
      tiles: ['test', ...Array(19).fill('')]
    };
    render(<QuartileBoard {...props} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('calls onTileSelect when clicking a tile with content', () => {
    const props = {
      ...mockProps,
      tiles: ['test', ...Array(19).fill('')]
    };
    render(<QuartileBoard {...props} />);
    fireEvent.click(screen.getByText('test'));
    expect(props.onTileSelect).toHaveBeenCalledWith(0);
  });
});