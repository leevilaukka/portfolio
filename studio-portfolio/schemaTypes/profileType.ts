import { defineField, defineType } from "sanity";

const profileType = defineType({
    name: "profile",
    title: "Profile",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
        }),
        defineField({
            name: "location",
            type: "string",
            title: "Location",
        }),
        defineField({
            name: "email",
            type: "string",
            title: "Email",
        }),
        defineField({
            name: "phone",
            type: "string",
            title: "Phone",
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Image",
        }),
        defineField({
            name: "github",
            type: "url",
            title: "GitHub",
        }),
        defineField({
            name: "description",
            type: "markdown",
            title: "Description",
        }),
        defineField({
            name: "cv",
            type: "file",
            title: "CV",
        }),
        defineField({
            name: "skills",
            type: "array",
            title: "Skills",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "language",
            type: "string",
            title: "Language",
        }),
    ],
});

export default profileType;