import { defineConfig, SchemaTypeDefinition } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas/index';

export default defineConfig({
    name: 'default',
    title: 'Samantha Jeet',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
    basePath: '/',
    studioHost: 'samanthajeet',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes as SchemaTypeDefinition[],
    },
}); 