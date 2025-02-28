# Personal Website with Blog

A modern personal website built with Next.js, TypeScript, Tailwind CSS, and Sanity.io for content management.

## Features

- Modern, responsive design with Tailwind CSS
- Blog functionality with Sanity.io CMS
- Portfolio section
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
   - Copy `.env.local` to `.env.local`
   - Update the `NEXT_PUBLIC_SANITY_PROJECT_ID` with your Sanity project ID

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
