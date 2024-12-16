import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatInterface from '../../src/components/ChatInterface';

describe('ChatInterface', () => {
  it('renders without crashing', () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('allows users to input and send messages', () => {
    render(<ChatInterface />);
    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello, NelsonBot!' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello, NelsonBot!')).toBeInTheDocument();
  });
});

