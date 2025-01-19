import { defineField, defineType } from 'sanity'

export const workType = defineType({
    name: 'work',
    title: 'Work Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            type: 'string',
            title: 'Company',
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Logo',
        }),
        defineField({
            name: 'position',
            type: 'string',
            title: 'Position',
        }),
        defineField({
            name: 'location',
            type: 'string',
            title: 'Location',
        }),
        defineField({
            name: "stillWorksHere",
            title: "I still work here",
            type: "boolean",
        }),
        defineField({
            name: "startDate",
            type: "date",
            options: {
                dateFormat: 'MMMM YYYY',
            },
        }),
        defineField({
            name: "endDate",
            type: "date",
            options: {
                dateFormat: 'MMMM YYYY',
            },
            hidden: ({document}) => !!document?.stillWorksHere,
        }),
        defineField({
            name: 'description',
            type: 'markdown',
            title: 'Description',
        }),
        defineField({
            name: 'tasks',
            type: 'array',
            of: [{type: 'string'}],
            title: 'Tasks',
        }),
        defineField({
            name:"nonIT",
            type:"boolean",
            title:"Non-IT Job"
        })
    ],
})