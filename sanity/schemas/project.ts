

const project = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'customImage',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
        },
        {
            name: 'liveUrl',
            title: 'Live URL',
            type: 'url',
        },
    ],
};

export default project;