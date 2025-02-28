

import { defineType } from 'sanity';



const category = defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            name: "color",
            title: "Color",
            type: "string",
            description: "Color of the category",
            options: {
                list: [
                    { title: "#a3b18a", value: "#a3b18a" },
                    { title: "#457b9d", value: "#457b9d" },
                    { title: "#9f86c0", value: "#9f86c0" },
                    { title: "#ee9b00", value: "#ee9b00" }
                ]
            }
        },
        {
            name: "description",
            title: "Description",
            type: "text"
        }
    ],
    preview: {
        select: {
            title: "title",
            color: "color"
        },
        prepare(selection: { title: string; color: string }) {
            const { title, color } = selection;
            return {
                title,
                subtitle: `Color: ${color}`
            };
        }
    }
});

export default category;