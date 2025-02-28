import { Rule } from '@sanity/types';

const customImage = {
    name: 'customImage',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true, // Enables manual crop
    },
    fields: [
        {
            name: 'alt',
            title: 'Alternative text',
            type: 'string',
            validation: (Rule: { required: () => Rule }) => Rule.required(),
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }
    ]
}

export default customImage;