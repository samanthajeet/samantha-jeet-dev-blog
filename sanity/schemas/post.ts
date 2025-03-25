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
            name: "body",
            title: "Body",
            type: "blockContent"
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
            name: 'openGraph',
            title: 'Open Graph',
            type: 'object',
            group: 'seo',
            description: 'These settings control how your post appears when shared on social networks',
            fields: [
                {
                    name: 'title',
                    title: 'Social Title',
                    type: 'string',
                    description: 'Defaults to post title if left empty',
                    validation: (rule: Rule) => rule.max(60),
                },
                {
                    name: 'description',
                    title: 'Social Description',
                    type: 'text',
                    description: 'Defaults to meta description if left empty',
                    validation: (rule: Rule) => rule.max(180),
                },
                {
                    name: 'image',
                    title: 'Social Image',
                    type: 'image',
                    description: 'Ideal size: 1200x630px',
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
                    name: 'type',
                    title: 'Content Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Article', value: 'article' },
                            { title: 'Website', value: 'website' },
                        ],
                    },
                    initialValue: 'article',
                }
            ]
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
            validation: (rule: Rule) => rule.max(210),
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