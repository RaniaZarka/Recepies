import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/app/(cms)/studio/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'myrecipies',

  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_DATASET as string,
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
