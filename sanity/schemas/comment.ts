import { defineType } from 'sanity';

const comment = defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'email',
            type: 'string',
        },
        {
            name: 'text',
            type: 'text',
        },
        {
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'createdAt',
            title: 'Created at',
            type: 'datetime',
            initialValue: new Date().toISOString(),
        },
        {
            name: 'post',
            type: 'reference',
            to: [{ type: 'post' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            name: 'name',
            text: 'text',
            createdAt: 'createdAt',
            approved: 'approved',
        },
        prepare(selection: {
            title: string;
            name: string;
            text: string;
            createdAt: string;
            approved: boolean;
        }) {
            const { name, createdAt, approved } = selection;
            return {
                title: `Comment by ${name}`,
                subtitle: `${new Date(createdAt).toLocaleDateString()} - ${approved ? 'Approved' : 'Pending'}`,
            };
        },
    },
});

export default comment;
