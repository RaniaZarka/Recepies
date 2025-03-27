// /schemas/imageObject.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'imageObject',
  title: 'Image Object',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
});
