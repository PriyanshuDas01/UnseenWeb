# Not So Unusual

A React and Next.js package that uses custom tags `<unseen>...</unseen>` to transform text dynamically using AI, with support for UTM parameters to customize the transformation based on marketing campaigns.

## Features

- 🔄 Dynamic text transformation using AI
- 🎯 UTM parameter support for marketing customization
- 🎨 Customizable prompts and styles
- ⚡️ Real-time text updates
- 🔒 Secure API key handling
- 🎭 Multiple AI model support

## Installation

```bash
npm install notsounusual
# or
yarn add notsounusual
```

## Quick Start

```tsx
import { UnseenProvider, Unseen } from 'notsounusual';

function App() {
  return (
    <UnseenProvider apiKey="your-openrouter-api-key">
      <h1>
        <Unseen>This text will be transformed by AI</Unseen>
      </h1>
    </UnseenProvider>
  );
}
```

## Usage with UTM Parameters

```tsx
import { UnseenProvider, Unseen } from 'notsounusual';

function App() {
  const utmConfig = {
    utm_source: 'facebook',
    utm_medium: 'social',
    utm_campaign: 'summer_sale',
    utm_content: 'sports_shoes'
  };

  return (
    <UnseenProvider 
      apiKey="your-openrouter-api-key"
      utmConfig={utmConfig}
    >
      <h1>
        <Unseen>This text will be transformed based on UTM parameters</Unseen>
      </h1>
    </UnseenProvider>
  );
}
```

## Test Application

The package includes a test application in the `test` directory that demonstrates the functionality of `notsounusual`. This test app is particularly useful for:

1. **Development Testing**: Quickly test changes to the package during development
2. **Feature Demonstration**: Showcase how UTM parameters affect text transformation
3. **Integration Example**: Serve as a reference implementation

### Running the Test App

1. Navigate to the test directory:
```bash
cd test
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file with your OpenRouter API key:
```
REACT_APP_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The test app includes:
- UTM parameter selection interface
- Real-time prompt preview
- Dynamic heading generation
- Error handling demonstration

## API Implementation

The package uses the OpenRouter API for AI text transformation. Here's the implementation details:

```typescript
fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <OPENROUTER_API_KEY>",
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "meta-llama/llama-3.3-8b-instruct:free",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]
  })
});
```

### AI Model

The package uses the `meta-llama/llama-3.3-8b-instruct:free` model from OpenRouter, which provides:
- High-quality text generation
- Context-aware responses
- Support for complex prompts
- Free tier availability

## Props

### UnseenProvider Props

| Prop | Type | Description |
|------|------|-------------|
| `apiKey` | string | Your OpenRouter API key |
| `customPrompt` | string | Optional custom prompt for text transformation |
| `utmConfig` | UtmConfig | Optional UTM parameters for customization |

### Unseen Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | string | The text to be transformed |
| `style` | CSSProperties | Optional custom styles |

## Marketing Use Cases

1. **Dynamic Headlines**: Generate different headlines based on traffic source
2. **Personalized CTAs**: Customize call-to-action text based on campaign
3. **A/B Testing**: Test different text variations automatically
4. **Campaign-Specific Content**: Show different content for different marketing campaigns
5. **Channel-Specific Messaging**: Adapt tone and style based on marketing channel

## UTM Parameter Support

The package supports all standard UTM parameters:
- `utm_source`: Traffic source (e.g., facebook, google)
- `utm_medium`: Marketing medium (e.g., social, email)
- `utm_campaign`: Campaign name
- `utm_content`: Content identifier
- `utm_term`: Search terms

# License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software, provided that:

The original copyright notice and license are included.

Proper attribution is given to the original author(s) in any distributed or derivative works.

For more details, refer to the LICENSE file in the repository.

Feel free to customize these sections further to align with your project's specific requirements.

## Support

For support, please open an issue in the GitHub repository.

## Author

Priyanshu Das
Github:-priyashudas01

