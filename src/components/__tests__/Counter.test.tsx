import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Counter from '../Counter';

describe('<Counter />', () => {
  it('renders properly', () => {
    expect(0).toBe(0);
    const { debug, getByTestId } = render(<Counter />);
    debug(); // Outputs dom as string
    const counterButton = getByTestId('counter-button');
    expect(counterButton.tagName).toBe('BUTTON');
    expect(counterButton.textContent).toBe('0');

    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe('1');
    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe('2');
    fireEvent.click(counterButton);
    expect(counterButton.textContent).toBe('3');
    debug();
  });
});
