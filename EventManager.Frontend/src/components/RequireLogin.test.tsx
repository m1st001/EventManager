import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RequireLogin from './RequireLogin';

describe('RequireLogin', () => {
  it('renders without crashing', () => {
    render(<RequireLogin />);
    // The component currently renders an empty div, so we'll just check that it renders
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});