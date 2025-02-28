/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './src/lib/sanity.client';



export default defineCliConfig({
    api: {
        projectId: projectId || '',
        dataset: dataset || ''
    },
    studioHost: 'samanthajeet'
})

