// /schemas/tag.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
  ],
});
