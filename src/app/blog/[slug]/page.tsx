import { getAuthor, getPosts } from '../../../lib/sanity.client';
import BlogContent from '@/components/BlogContent';
import { getPost } from '../../../lib/sanity.client';
import { Author, Post } from '@/types';
import { Metadata } from 'next'
import { urlForImage } from '@/lib/sanity.image'
import { notFound } from 'next/navigation';

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // Wait for the slug
    const slug = await params.slug
    // Then get the post
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Not Found',
            description: 'The page you are looking for does not exist.',
        }
    }

    const ogImage = post.openGraph?.image
        ? urlForImage(post.openGraph.image)?.url()
        : post.mainImage
            ? urlForImage(post.mainImage)?.url()
            : null

    return {
        title: post.openGraph?.title || post.title,
        description: post.openGraph?.description || post.metaDescription,
        openGraph: {
            title: post.openGraph?.title || post.title,
            description: post.openGraph?.description || post.metaDescription,
            type: post.openGraph?.type || 'article',
            images: ogImage ? [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.openGraph?.image?.alt || post.title,
                }
            ] : [],
        },
        twitter: {
            card: post.twitter?.card || 'summary_large_image',
            title: post.openGraph?.title || post.title,
            description: post.openGraph?.description || post.metaDescription,
            images: post.twitter?.image
                ? [urlForImage(post.twitter.image)?.url() || '']
                : ogImage
                    ? [ogImage]
                    : [],
        },
    }
}

export async function generateStaticParams() {
    const posts = await getPosts()

    // Add null check and filter out any posts without slugs
    return posts
        ?.filter((post: Post) => post?.slug?.current)
        .map((post: Post) => ({
            slug: post.slug.current,
        })) || []
}

export default async function BlogPost({ params }: Props) {
    const slug = await params.slug
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const author: Author = await getAuthor(post.author.name);

    return (
        <BlogContent
            postId={post._id}
            content={post.body}
            title={post.title}
            mainImage={post.mainImage}
            author={author}
            publishedAt={post.publishedAt}
            comments={post.comments}
        />
    );
}