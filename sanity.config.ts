import { defineConfig, SchemaTypeDefinition } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas/index';
import { table } from '@sanity/table'
import {
    pageStructure,
} from "./src/lib/plugins/settings";
import settings from './sanity/schemas/settings';

export default defineConfig({
    name: 'default',
    title: 'Samantha Jeet',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
    basePath: '/',
    studioHost: 'samanthajeet',
    plugins: [structureTool({ structure: pageStructure([settings]) }), visionTool(), table()],
    schema: {
        types: schemaTypes as SchemaTypeDefinition[],
    },
}); 