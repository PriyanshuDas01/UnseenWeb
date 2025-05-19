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
      <UnseenProvider 
        apiKey="test-key"
        customPrompt="Transform this text: {text}"
      >
        <Unseen>Test text</Unseen>
      </UnseenProvider>
    );
    expect(screen.getByText('Transforming...')).toBeInTheDocument();
  });

  it('renders error state when API call fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <UnseenProvider 
        apiKey="test-key"
        customPrompt="Transform this text: {text}"
      >
        <Unseen>Test text</Unseen>
      </UnseenProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test text')).toBeInTheDocument();
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
      <UnseenProvider 
        apiKey="test-key"
        customPrompt="Transform this text: {text}"
      >
        <Unseen>Test text</Unseen>
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
        customPrompt="Transform this text: {text}"
        utmConfig={{
          enabled: true,
          dynamicText: {
            source: {
              template: "test",
              variables: ["source"]
            },
            medium: {
              template: "test",
              variables: ["medium"]
            },
            campaign: {
              template: "test",
              variables: ["campaign"]
            }
          }
        }}
      >
        <Unseen>Test text</Unseen>
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