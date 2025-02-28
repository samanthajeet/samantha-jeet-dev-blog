import { defineConfig, SchemaTypeDefinition } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas/index';

export default defineConfig({
    name: 'default',
    title: 'Your Project Name',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    studioHost: 'samanthajeet',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes as SchemaTypeDefinition[],
    },
}); 