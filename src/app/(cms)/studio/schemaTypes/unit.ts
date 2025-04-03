// /schemas/unit.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'unit',
  title: 'Unit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Unit',
      type: 'string',
   
    }),
    defineField({
      name: 'abbreviation',
      title: 'Abbreviation',
      type: 'string',
      description: 'e.g., tsp, tbsp, cup',
    }),
  ],
});
