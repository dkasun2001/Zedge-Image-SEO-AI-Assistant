# Image SEO AI Assistant

A TypeScript and React-based application that uses Google's Gemini AI to assist with image SEO optimization.

## Overview

This project helps optimize image metadata, descriptions, and tags for better search engine visibility. Leveraging the power of Google's Gemini AI API, it generates SEO-friendly content for your images.

**Live Demo:** [https://image-seo-ai-assistant.netlify.app/](https://image-seo-ai-assistant.netlify.app/)

## Features

- AI-powered image description generation
- SEO optimization for image metadata
- Tag suggestion based on image content
- React-based user interface
- TypeScript for type safety and better developer experience

## Tech Stack

- **Frontend**: React 18
- **Language**: TypeScript
- **AI Integration**: Google Gemini API
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Dependencies**: 
  - @google/genai
  - react
  - react-dom

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Google Gemini API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dkasun2001/Zedge-Image-SEO-AI-Assistant.git
   cd Zedge-Image-SEO-AI-Assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173/).

## Building for Production

To create a production build:

```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build locally:

```
npm run preview
```

## Project Structure

- `src/` - Source code directory
  - TypeScript components and application logic
- `public/` - Static assets
- `dist/` - Production build output (generated after build)

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Dinusha Kasun Heenatiyangala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

- **Name**: Dinusha Kasun Heenatiyangala
- **GitHub**: [dkasun2001](https://github.com/dkasun2001)
- **Email**: dinushakasun1234@gmail.com
- **Location**: Kandy, Sri Lanka

Feel free to reach out with any questions, suggestions, or feedback!

---
Last updated: 2025-07-08
