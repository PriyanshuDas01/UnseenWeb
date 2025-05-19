import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { UnseenProvider, Unseen } from '../index';

// Mock the fetch function
global.fetch = jest.fn();

describe('Unseen Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <UnseenProvider apiKey="test-key">
        <Unseen text="Test text" />
      </UnseenProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when API call fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <UnseenProvider apiKey="test-key">
        <Unseen text="Test text" />
      </UnseenProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error transforming text: API Error')).toBeInTheDocument();
    });
  });

  it('renders transformed text when API call succeeds', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Transformed text'
          }
        }
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    render(
      <UnseenProvider apiKey="test-key">
        <Unseen text="Test text" />
      </UnseenProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Transformed text')).toBeInTheDocument();
    });
  });

  it('uses UTM parameters when provided', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Transformed text with UTM'
          }
        }
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    render(
      <UnseenProvider 
        apiKey="test-key"
        utmConfig={{
          source: 'test',
          medium: 'test',
          campaign: 'test',
          dynamicText: true
        }}
      >
        <Unseen text="Test text" />
      </UnseenProvider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('test')
        })
      );
    });
  });
}); 