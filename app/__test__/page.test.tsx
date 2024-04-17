import React from 'react';

import { render, screen } from '@testing-library/react';
import Home from '../page';
import { products } from '../../utils/products'
import "@testing-library/jest-dom"

test('Displays NullData component for empty category filter results', () => {
    const searchParams = { category: 'non-existent' };
  
    render(<Home searchParams={searchParams} />);
  
    const nullData = screen.getByText(/Oops! No Products found/i);
    expect(nullData).toBeInTheDocument(); // Assert NullData component is rendered
  });