/// <reference types="node" />

declare module 'node:process' {
  /** Named export (runtime); not always present on `typeof import('node:process')` in older typings. */
  export const env: NodeJS.ProcessEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    ANTHROPIC_API_KEY?: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
    NEXT_PUBLIC_SANITY_DATASET?: string;
    SANITY_STUDIO_PROJECT_ID?: string;
    SANITY_STUDIO_DATASET?: string;
  }
}
