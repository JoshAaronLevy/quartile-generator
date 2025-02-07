import { render, screen } from '@testing-library/react';
import { BoardProvider } from './context/BoardContext';
import App from './App';

const renderWithProvider = (component) => {
  return render(
    <BoardProvider>
      {component}
    </BoardProvider>
  );
};

describe('App', () => {
  it('renders the app title', () => {
    renderWithProvider(<App />);
    expect(screen.getByText('Quartile Generator')).toBeInTheDocument();
  });

  it('renders the add tile input', () => {
    renderWithProvider(<App />);
    expect(screen.getByLabelText('New Tile Letters')).toBeInTheDocument();
  });

  it('renders analyze button disabled initially', () => {
    renderWithProvider(<App />);
    const analyzeButton = screen.getByText('Analyze Selected Tiles');
    expect(analyzeButton).toBeDisabled();
  });
});