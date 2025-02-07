import { render, screen, fireEvent } from '@testing-library/react';
import WordList from '../WordList';

describe('WordList', () => {
  const mockWords = {
    twoTiles: ['at', 'in'],
    threeTiles: ['cat', 'dog'],
    fourTiles: ['test', 'word']
  };

  it('shows loading state correctly', () => {
    render(<WordList words={{}} isLoading={true} totalPossibilities={100} />);
    expect(screen.getByText('Analyzing 100 possible combinations...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows empty state when no words are provided', () => {
    render(<WordList words={{}} isLoading={false} totalPossibilities={0} />);
    expect(screen.getByText('Select tiles to see possible word combinations')).toBeInTheDocument();
  });

  it('displays correct word counts in tabs', () => {
    render(<WordList words={mockWords} isLoading={false} totalPossibilities={0} />);
    expect(screen.getByText('All Words (6)')).toBeInTheDocument();
    expect(screen.getByText('2 Tiles (2)')).toBeInTheDocument();
    expect(screen.getByText('3 Tiles (2)')).toBeInTheDocument();
    expect(screen.getByText('4 Tiles (2)')).toBeInTheDocument();
  });

  it('filters words when changing tabs', () => {
    render(<WordList words={mockWords} isLoading={false} totalPossibilities={0} />);
    fireEvent.click(screen.getByText('2 Tiles (2)'));
    expect(screen.getByText('at')).toBeInTheDocument();
    expect(screen.getByText('in')).toBeInTheDocument();
    expect(screen.queryByText('cat')).not.toBeInTheDocument();
  });
});
