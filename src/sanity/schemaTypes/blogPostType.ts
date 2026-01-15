import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from 'sanity';

export const blogPostType = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: {type: 'author'},
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ]
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: {type: 'category'},
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            type: 'blockContent',
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'English',  value: 'en' },
                    { title: 'Nepali', value: 'ne' },
                ],
            },
            initialValue: 'en',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            category: 'category.title',
            media: 'mainImage',
        },
        prepare(selection) {
            const {author, category} = selection;
            return {
                ...selection, 
                subtitle: `${category || 'Unrecognized'} ${author ? `. by ${author}` : ''}`
            }
        },
    },
});