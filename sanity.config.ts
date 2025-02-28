import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
    name: 'default',
    title: 'Personal Website',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/admin/studio',
    plugins: [deskTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
}); 