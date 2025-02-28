import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
});

export async function getPosts() {
    return client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        "author": author->name,
        mainImage
      }
    `)
}