// /schemas/cuisine.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cuisine',
  title: 'Cuisine',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
  ],
});
