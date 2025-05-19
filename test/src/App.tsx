import React, { useState } from 'react';
import { UnseenProvider, Unseen } from 'notsounusual';

function App() {
  const [utmParams, setUtmParams] = useState({
    utm_source: 'facebook',
    utm_medium: 'social',
    utm_campaign: 'summer_sale',
    utm_content: 'sports_shoes'
  });

  const handleUtmChange = (key: string, value: string) => {
    setUtmParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const customPrompt = `You are a marketing expert for Bata footwear. you have to only give this single output and nothing else -Create an engaging heading of 6 words max  based on these UTM parameters: utm_source=${utmParams.utm_source}, utm_medium=${utmParams.utm_medium}, utm_campaign=${utmParams.utm_campaign}, utm_content=${utmParams.utm_content}. The heading should: 1) Be engaging and attractive 2) Be maximum 6 words 3) Reference the product category from utm_content 4) Match the marketing channel style from utm_source 5) Consider the campaign context from utm_campaign`;

  // Check if API key is available
  if (!process.env.REACT_APP_OPENROUTER_API_KEY) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error: OpenRouter API key is not set. Please check your .env file.
      </div>
    );
  }

  return (
    <UnseenProvider
      apiKey={process.env.REACT_APP_OPENROUTER_API_KEY}
      customPrompt={customPrompt}
    >
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1>Bata Footwear Dynamic Headings</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>Current UTM Parameters:</h2>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
            <div>
              <label>Source: </label>
              <select 
                value={utmParams.utm_source} 
                onChange={(e) => handleUtmChange('utm_source', e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="google">Google</option>
                <option value="email">Email</option>
                <option value="app">App</option>
              </select>
            </div>
            <div>
              <label>Medium: </label>
              <select 
                value={utmParams.utm_medium} 
                onChange={(e) => handleUtmChange('utm_medium', e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="social">Social</option>
                <option value="cpc">CPC</option>
                <option value="newsletter">Newsletter</option>
                <option value="push">Push</option>
                <option value="banner">Banner</option>
              </select>
            </div>
            <div>
              <label>Campaign: </label>
              <select 
                value={utmParams.utm_campaign} 
                onChange={(e) => handleUtmChange('utm_campaign', e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="summer_sale">Summer Sale</option>
                <option value="back_to_school">Back to School</option>
                <option value="winter_sale">Winter Sale</option>
                <option value="flash_sale">Flash Sale</option>
                <option value="clearance">Clearance</option>
              </select>
            </div>
            <div>
              <label>Content: </label>
              <select 
                value={utmParams.utm_content} 
                onChange={(e) => handleUtmChange('utm_content', e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="sports_shoes">Sports Shoes</option>
                <option value="school_shoes">School Shoes</option>
                <option value="formal_shoes">Formal Shoes</option>
                <option value="casual_shoes">Casual Shoes</option>
                <option value="sandals">Sandals</option>
                <option value="boots">Boots</option>
              </select>
            </div>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '5px',
            marginTop: '20px'
          }}>
            <h3>Current Prompt:</h3>
            <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{customPrompt}</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Dynamic Heading:</h2>
          <h3>
            <Unseen>Default heading</Unseen>
          </h3>
        </div>
      </div>
    </UnseenProvider>
  );
}

export default App; 