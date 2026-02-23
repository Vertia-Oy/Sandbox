import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the Wiki header', () => {
    render(<App />);
    expect(screen.getByText('Wiki')).toBeInTheDocument();
  });

  it('renders the editor toolbar', () => {
    render(<App />);
    expect(screen.getByTitle('Otsikko 1')).toBeInTheDocument();
    expect(screen.getByTitle('Lista')).toBeInTheDocument();
    expect(screen.getByTitle('Tehtävälista')).toBeInTheDocument();
    expect(screen.getByTitle('Koodilohko')).toBeInTheDocument();
    expect(screen.getByTitle('Lisää taulukko')).toBeInTheDocument();
    expect(screen.getByTitle('Lisää kuva')).toBeInTheDocument();
  });

  it('renders the status bar', () => {
    render(<App />);
    // Status bar should show some status text
    const statusBar = document.querySelector('.status-bar');
    expect(statusBar).toBeInTheDocument();
  });
});
