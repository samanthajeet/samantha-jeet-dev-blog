import { Rule } from '@sanity/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    groups: [
        {
            name: 'content',
            title: 'Content',
        },
        {
            name: 'seo',
            title: 'SEO & Social',
        },
        {
            name: 'metadata',
            title: 'Post Metadata',
        }
    ],
    fields: [
        // Content Group
        {
            name: 'title',
            title: 'Post Title',
            type: 'string',
            group: 'content',
            validation: (rule: Rule) => rule.required().max(70),
        },
        {
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            group: 'content',
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                    validation: (rule: Rule) => rule.required(),
                },
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                }
            ]
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: { type: 'category' } }]
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: { type: 'comment' } }],
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' }
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' }
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'URL',
                                fields: [
                                    {
                                        title: 'URL',
                                        name: 'href',
                                        type: 'url'
                                    }
                                ]
                            },
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal link',
                                fields: [
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [
                                            { type: 'post' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility.',
                            validation: (rule: Rule) => rule.required()
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                            description: 'Image caption'
                        }
                    ]
                }
            ]
        },

        // SEO & Social Group
        {
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
            description: 'Title tag for search engines. Keep under 60 characters.',
            validation: (rule: Rule) => rule.max(60),
        },
        {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            group: 'seo',
            description: 'Description for search engines. Keep between 150-160 characters for optimal display.',
            validation: (rule: Rule) => rule.min(150).max(180),
        },
        {
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            group: 'seo',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            },
            description: 'Add relevant keywords (optional)',
        },
        {
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
            group: 'seo',
            description: 'Use this to specify the preferred version of a page for SEO',
        },
        {
            name: 'socialImage',
            title: 'Social Sharing Image',
            type: 'image',
            group: 'seo',
            description: 'Image for social media sharing (1200x630px recommended)',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    validation: (rule: Rule) => rule.required(),
                }
            ]
        },
        {
            name: 'ogTitle',
            title: 'Social Title',
            type: 'string',
            group: 'seo',
            description: 'Title for social media sharing. Keep under 60 characters.',
            validation: (rule: Rule) => rule.max(60),
        },
        {
            name: 'ogDescription',
            title: 'Social Description',
            type: 'text',
            group: 'seo',
            description: 'Description for social media sharing. Keep under 160 characters.',
            validation: (rule: Rule) => rule.max(160),
        },

        // Metadata Group
        {
            name: 'language',
            title: 'Language',
            type: 'string',
            group: 'metadata',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'Spanish', value: 'es' },
                    // Add more languages as needed
                ]
            },
            initialValue: 'en',
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'metadata',
        },
        {
            name: 'updatedAt',
            title: 'Last Updated',
            type: 'datetime',
            group: 'metadata',
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            group: 'metadata',
            description: 'Brief summary of the post. Used in blog listings and SEO.',
            validation: (rule: Rule) => rule.max(200),
        },
        {
            name: 'readingTime',
            title: 'Reading Time',
            type: 'number',
            group: 'metadata',
            description: 'Estimated reading time in minutes',
        },
        {
            name: 'isIndexed',
            title: 'Index this post',
            type: 'boolean',
            group: 'seo',
            description: 'Should this post be indexed by search engines?',
            initialValue: true,
        },
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: { title: string; author: string; media: SanityImageSource }) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
};

export default post;