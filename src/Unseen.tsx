import React, { useState, useEffect } from 'react';
import { useUnseen } from './UnseenContext';

interface UnseenProps {
  children: string;
}

export const Unseen: React.FC<UnseenProps> = ({ children }) => {
  const [transformedText, setTransformedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, customPrompt } = useUnseen();

  useEffect(() => {
    const transformText = async () => {
      if (!children.trim()) return;
      
      setIsLoading(true);
      try {
        console.log('Sending prompt to AI:', customPrompt); // Debug log

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Unseen AI Text'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.3-8b-instruct:free',
            messages: [
              {
                role: 'system',
                content: customPrompt
              },
              {
                role: 'user',
                content: 'Generate a heading based on the UTM parameters provided.'
              }
            ]
          })
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Invalid API response format');
        }

        const transformed = data.choices[0].message.content;
        setTransformedText(transformed);
      } catch (error) {
        console.error('Error transforming text:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        setTransformedText(children);
      } finally {
        setIsLoading(false);
      }
    };

    transformText();
  }, [children, apiKey, customPrompt]);

  return (
    <span className="unseen-text">
      {isLoading ? 'Transforming...' : transformedText}
    </span>
  );
}; 