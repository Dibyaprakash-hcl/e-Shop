import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../../register/page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('Register Component', () => {
  test('renders without crashing', () => {
    render(<Register />);
    const registerElement = screen.getByTestId('register');
    expect(registerElement).toBeInTheDocument();
  });

});