// /schemas/recipeIngredient.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'recipeIngredient',
  title: 'Recipe Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'ingredient',
      title: 'Ingredient',
      type: 'reference',
      to: [{ type: 'ingredient' }],
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'string',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'reference',
      to: [{ type: 'unit' }],
      
    }),
  ],
});
