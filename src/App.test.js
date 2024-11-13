import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the child components
jest.mock('./components/Layout', () => {
  return function MockLayout({ children }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

jest.mock('./pages/ChatPage', () => {
  return function MockChatPage() {
    return <div data-testid="mock-chat-page">Chat Page Content</div>;
  };
});

// Mock BrowserRouter to prevent double Router issue
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => <>{children}</>,
    Routes: ({ children }) => <>{children}</>,
    Route: ({ element }) => element
  };
});

describe('App Component', () => {
  test('renders Layout component', () => {
    render(<App />);
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
  });

  test('renders ChatPage component at root path', () => {
    render(<App />);
    expect(screen.getByTestId('mock-chat-page')).toBeInTheDocument();
  });

  test('ChatPage is rendered with Layout wrapper', () => {
    render(<App />);
    const layout = screen.getByTestId('mock-layout');
    const chatPage = screen.getByTestId('mock-chat-page');
    expect(layout).toContainElement(chatPage);
  });

  test('renders correct component for root path', () => {
    render(<App />);
    expect(screen.getByTestId('mock-chat-page')).toBeInTheDocument();
  });
});
