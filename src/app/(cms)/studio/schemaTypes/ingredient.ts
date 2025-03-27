// /schemas/ingredient.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
  ],
});
