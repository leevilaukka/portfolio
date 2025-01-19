import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
        defineField({
            name: 'description',
            type: 'markdown',
            title: 'Description',
        }),
        defineField({
            name: 'images',
            type: 'array',
            title: 'Images',
            of: [{type: 'image'}],
        }),
        defineField({
            name: "tech",
            type: "array",
            title: "Tech",
            of: [{type: "string"}],
        }),
        defineField({
            name: 'link',
            type: 'url',
            title: 'URL',
        }),
        defineField({
            name: 'github',
            type: 'url',
            title: 'GitHub URL',
        }),
    ],
})