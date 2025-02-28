import { SanityImage } from '@/types';
import { client } from '../../../../lib/sanity.client';
import BlogContent from '@/components/BlogContent';
import { PortableTextBlock } from '@portabletext/react';
interface Post {
    title: string;
    mainImage: SanityImage;
    body: PortableTextBlock[];
    excerpt?: string;
    author?: {
        name: string;
        image: SanityImage;
    };
    publishedAt: string;
}

async function getPost(slug: string) {
    const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      mainImage,
      body,
      excerpt,
      author->{
        name,
        image
      },
      publishedAt
    }
  `, { slug });
    return post;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post: Post | null = await getPost(params.slug);

    return {
        title: post?.title || 'Blog Post',
        description: post?.excerpt || 'Blog post on my personal website',
    };
}

export async function generateStaticParams() {
    const posts = await client.fetch(`
    *[_type == "post"] {
      slug
    }
  `);
    return posts.map((post: { slug: { current: string } }) => ({
        slug: post.slug.current,
    }));
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post: Post | null = await getPost(params.slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <BlogContent
            content={post.body}
            title={post.title}
            mainImage={post.mainImage}
            author={post.author}
            publishedAt={post.publishedAt}
        />
    );
} 