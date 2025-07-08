# Personal Website with Blog

A modern personal website built with Next.js, TypeScript, Tailwind CSS, and Sanity.io for content management.

## Features

- Modern, responsive design with Tailwind CSS
- Blog functionality with Sanity.io CMS
- Portfolio section
- **Ask Sam Chat Feature** - AI-powered chat interface using Anthropic Claude
- SEO optimized
- TypeScript for better development experience
- Fast page loads with Next.js 14

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Sanity.io account and project:
   - Go to [sanity.io](https://www.sanity.io/)
   - Create a new project
   - Get your project ID
   - Update the `.env.local` file with your Sanity project ID

4. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Sanity project ID: `NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id`
   - Add your Anthropic API key for the Ask Sam feature: `ANTHROPIC_API_KEY=your_anthropic_api_key`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to see your website

## Sanity Studio

The Sanity Studio is included in this project. To access it:

1. Run the development server
2. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio)
3. Log in with your Sanity account
4. Start creating content!

## Ask Sam Chat Feature

The Ask Sam feature allows visitors to chat with an AI version of Samantha Jeet. The AI is trained on her background, career, and personal information to provide authentic responses in her voice.

### Setup

1. Get an Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)
2. Add the API key to your `.env.local` file: `ANTHROPIC_API_KEY=your_key_here`
3. Access the chat at [http://localhost:3000/apps/askSam](http://localhost:3000/apps/askSam)

### Features

- Real-time chat interface
- AI responses in Samantha's voice and personality
- Knowledge about career, background, and personal interests
- Beautiful, responsive UI

## Deployment

This project is ready to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel
4. Deploy!

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   └── lib/             # Utility functions and configurations
├── public/              # Static files
├── sanity/             # Sanity schema and configuration
└── package.json        # Project dependencies and scripts
```

## Contributing

Feel free to submit issues and enhancement requests!
