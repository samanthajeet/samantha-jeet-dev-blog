import { createClient } from 'next-sanity';
import { singlequery, allPostsQuery, singlePostQuery, pathsQuery, allCategoriesQuery, postsByCategoryQuery, postCommentsQuery, singleAuthorQuery, postquery, pathquery } from './groq';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13';
const token = process.env.SANITY_API_WRITE_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});


export async function getPosts() {
  return client.fetch(allPostsQuery, undefined, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery)) || [];
  }
  return [];
}

export async function getPostBySlug(slug: string) {
  if (client) {
    return (await client.fetch(singlequery, { slug })) || {};
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || [];
    return slugs.map((slug: string) => ({ slug }));
  }
  return [];
}


export async function getPost(slug: string) {
  return client.fetch(singlePostQuery, { slug }, {
    cache: 'no-store',
    next: { revalidate: 0 }
  })
}

export async function getCategories() {
  return client.fetch(allCategoriesQuery)
}

export async function getPostsByCategory(slug: string) {
  return client.fetch(postsByCategoryQuery, { slug })
}

export async function getCommentsForPost(postId: string) {
  return client.fetch(postCommentsQuery, { postId })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(pathsQuery)
  return slugs.map((slug: string) => ({ slug }))
}

export async function getAuthor(name: string) {
  const author = await client.fetch(singleAuthorQuery, { name });
  return author;
}
