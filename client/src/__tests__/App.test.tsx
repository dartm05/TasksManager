import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Task Manager header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Task Manager/i);
  expect(headerElement).toBeInTheDocument();
});