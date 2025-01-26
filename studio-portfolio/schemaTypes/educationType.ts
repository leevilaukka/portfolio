import { defineField, defineType } from 'sanity'

export const educationType = defineType({
    name: 'education',
    title: 'Education',
    type: 'document',
    orderings: [
        {
            name: 'startDateAsc',
            title: 'Start Date new->old',
            by: [
                {field: 'startDate', direction: 'asc'}
            ]
        },
        {
            name: 'startDateDesc',
            title: 'Start Date old->new',
            by: [
                {field: 'startDate', direction: 'desc'}
            ]
        },
    ],
    fields: [
        defineField({
            name: 'institution',
            type: 'string',
            title: 'Institution',
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Image",
        }),
        defineField({
            name: 'degree',
            type: 'string',
            title: 'Degree',    
        }),
        defineField({
            name: 'location',
            type: 'string',
            title: 'Location',
        }),
        defineField({
            name: "startDate",
            type: "date",
            options: {
                dateFormat: 'MMMM YYYY',
            }
        }),
        defineField({
            name: "endDate",
            type: "date",
            options: {
                dateFormat: 'MMMM YYYY',
            }
        }),
        defineField({
            name: 'description',
            type: 'markdown',
            title: 'Description',
        }),
        defineField({
            name: 'courses',
            type: 'array',
            title: 'Relevant Courses',
            of: [{type: 'object', fields: [{type: 'string', name: 'course'}, {type: 'number', name: 'grade'}, {type:"number", name:"credits"}] }],
        }),
        defineField({
            name: 'language',
            type: 'string',
            title: 'Language',
            options: {
                list: ['en', 'fi']
            }
        }),
    ],
    
})