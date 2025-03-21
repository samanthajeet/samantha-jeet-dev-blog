import { defineType, defineField } from 'sanity'

const postSchema = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    initialValue: () => ({
        publishedAt: new Date().toISOString()
    }),
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            description:
                "The excerpt is used in blog feeds, and also for search results",
            type: 'text',
            rows: 4
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' }
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Image caption',
                    description: 'Appears below image.',
                },
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessiblity.'
                }
            ],
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: { type: 'category' } }]
        }),
        defineField({
            name: 'comments',
            title: 'Comments',
            type: 'array',
            group: 'content',
            of: [{ type: 'reference', to: { type: 'comment' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime'
        }),
        defineField({
            name: 'featured',
            title: 'Mark as Featured',
            type: 'boolean'
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        })
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage'
        },
        prepare(selection) {
            const { author } = selection;
            return {
                title: selection.title,
                subtitle: author ? `by ${author}` : '',
                media: selection.media
            }
        }
    }
})

export default postSchema
