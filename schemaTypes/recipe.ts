// /schemas/recipe.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Main Course', value: 'main course' },
          { title: 'Soups', value: 'soups' },
          { title: 'Salads', value: 'salads' },
          { title: 'Deserts', value: 'deserts' },
          { title: 'Appetizers', value: 'appetizers' },
          { title: 'Beverages', value: 'beverages' },
          { title: 'Bread', value: 'bread' },
        ],
      },
     }),
   defineField({
      name: "method",
      title: "Method / Instructions",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: 'prepTime', title: 'Prep Time (minutes)', type: 'number' }),
    defineField({ name: 'cookTime', title: 'Cook Time (minutes)', type: 'number' }),
    defineField({ name: 'servings', title: 'Servings', type: 'number' }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Hard', value: 'hard' },
        ],
      },
    }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'imageObject' }] }),
    defineField({ name: 'tag', title: 'Tag', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }] }),
    defineField({ name: 'cuisine', title: 'Cuisine', type: 'array', of: [{ type: 'reference', to: [{ type: 'cuisine' }] }] }),
    defineField({
      name: 'ingredient',
      title: 'Ingredient',
      type: 'array',
      of: [{ type: 'recipeIngredient' }],
    }),
    
    
  ],

});
