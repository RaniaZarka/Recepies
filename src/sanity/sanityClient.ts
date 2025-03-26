import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_DATASET as string,
  apiVersion: '2023-03-24', // Use current date
  useCdn: true, // `true` for fast cache, `false` if you want fresh data always
});

export default client;
