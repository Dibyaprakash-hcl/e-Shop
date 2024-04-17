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

  test('Displays filtered products by category', () => {
    const searchParams = { category: 'Phone' };
    const filteredProducts = products.filter(product => product.category === 'Phone');
  
    render(<Home searchParams={searchParams} />);
  
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(filteredProducts.length); // Assert number of product cards matches filtered products
  });

test('Displays NullData component for empty search term results', () => {
    const searchParams = { searchTerm: 'unavailable' };
  
    render(<Home searchParams={searchParams} />);
  
    const nullData = screen.getByText(/Oops! No Products found/i);
    expect(nullData).toBeInTheDocument(); // Assert NullData component is rendered
  });

  test('Displays filtered products by search term', () => {
    const mockSearchTerm = 'iphone';
    const searchParams = { searchTerm: mockSearchTerm };
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(mockSearchTerm.toLowerCase())
    );
  
    render(<Home searchParams={searchParams} />);
  
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(filteredProducts.length); // Assert number of product cards matches filtered products
  });

  test('Displays all products when no search parameters are provided', () => {
    const searchParams = {};
    render(<Home searchParams={searchParams} />);
  
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(products.length); // Assert number of product cards matches available products
  });