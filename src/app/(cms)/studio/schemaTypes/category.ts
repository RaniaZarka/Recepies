import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
        maxLength: 96,
      },
    }),
  ],
});
