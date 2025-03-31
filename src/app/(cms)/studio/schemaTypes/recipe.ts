// /schemas/recipe.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'method',
      title: 'Method / Instructions',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
    }),
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
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options:{
       hotspot:true,
      }
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'cuisine',
      title: 'Cuisine',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'cuisine' }] }],
    }),
    defineField({
      name: 'ingredient',
      title: 'Ingredient',
      type: 'array',
      of: [{ type: 'recipeIngredient' }],
    }),
  ],
});
