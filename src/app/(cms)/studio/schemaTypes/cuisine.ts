import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'cuisine',
  title: 'Cuisine',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
    }),
  ],
});
