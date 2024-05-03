// frontend/tests/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    expect(screen.getByText('Crypto Prices')).toBeInTheDocument();
  });
});
