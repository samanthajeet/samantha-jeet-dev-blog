/**
 * Sanity CLI config — keep this file free of `next-sanity` / app imports.
 * Importing `src/lib/sanity.client` can break `sanity deploy` (CLI config fails to load).
 *
 * Env: same IDs as the app / studio. The CLI does not load `.env.local` like Next.js;
 * run `npx sanity deploy` with vars exported, or use a root `.env` Sanity can read.
 */
import { env } from 'node:process';
import { defineCliConfig } from 'sanity/cli';

const projectId =
  env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  env.SANITY_STUDIO_PROJECT_ID ||
  '';

const dataset =
  env.NEXT_PUBLIC_SANITY_DATASET || env.SANITY_STUDIO_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'samanthajeet',
});
