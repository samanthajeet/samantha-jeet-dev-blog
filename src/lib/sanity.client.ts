import { createClient } from 'next-sanity';

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
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      "slug": slug.current,
      mainImage {
        asset->,
        alt,
        caption
      },
      publishedAt,
      excerpt,
      categories[]->{
        _id,
        title,
        "slug": slug.current,
        color
      },
      author->{
        name,
        image {
          asset->
        },
        bio
      }
    }
  `, {}, {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  return posts;
}

export async function getPost(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      mainImage {
        asset->,
        alt,
        caption
      },
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      },
      excerpt,
      author->{
        name,
        image {
          asset->
        },
        bio
      },
      publishedAt,
      comments[]->,
      categories[]->,
      openGraph,
      twitter
    }
  `, { slug });
  return post;
}

export async function getAuthor(name: string) {
  const author = await client.fetch(`
    *[_type == "author" && name == $name][0] {
      name,
      image,
      bio
    }
  `, { name });
  return author;
}


export async function getCategories() {
  const categories = await client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      color,
      value,
      description
    }
  `);
  return categories;
}

export async function getCommentsForPost(postId: string) {
  const comments = await client.fetch(`
    *[_type == "comment" && post._ref == $postId] {
      ...,
      post->
    }
  `, { postId });
  return comments;
}

export async function getPostsByCategory(slug: string) {
  const posts = await client.fetch(`
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
}
  `, { slug });
  return posts;
}