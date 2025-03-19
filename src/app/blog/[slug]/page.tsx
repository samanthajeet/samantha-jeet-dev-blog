import { getAuthor, getPosts } from '../../../lib/sanity.client';
import BlogContent from '@/components/BlogContent';
import { getPost } from '../../../lib/sanity.client';
import { Author, Post } from '@/types';
import { Metadata } from 'next'
import { urlForImage } from '@/lib/sanity.image'
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const post = await getPost(params.slug)

    if (!post) {
        return {
            title: 'Not Found',
            description: 'The page you are looking for does not exist.',
        }
    }

    // Safe image URL resolution with error handling
    const getImageUrl = (image: { asset?: { _ref: string } }): string | null => {
        try {
            if (!image?.asset) {
                return null
            }
            const imageUrl = urlForImage(image)?.url()
            return imageUrl || null
        } catch (error) {
            console.warn('Error resolving image URL:', error)
            return null
        }
    }

    // Safely get OG image URL
    const ogImage = getImageUrl(post.openGraph?.image) ||
        getImageUrl(post.mainImage) ||
        '/default-og-image.jpg' // Fallback image

    const metadata: Metadata = {
        title: post.openGraph?.title || post.title || 'Blog Post',
        description: post.openGraph?.description ||
            post.metaDescription ||
            'Read our latest blog post',
        openGraph: {
            title: post.openGraph?.title || post.title || 'Blog Post',
            description: post.openGraph?.description ||
                post.metaDescription ||
                'Read our latest blog post',
            type: post.openGraph?.type || 'article',
            images: ogImage ? [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.openGraph?.image?.alt ||
                        post.mainImage?.alt ||
                        post.title ||
                        'Blog post image'
                }
            ] : [],
        },
        twitter: {
            card: post.twitter?.card || 'summary_large_image',
            title: post.openGraph?.title || post.title || 'Blog Post',
            description: post.openGraph?.description ||
                post.metaDescription ||
                'Read our latest blog post',
            images: (() => {
                const twitterImageUrl = getImageUrl(post.twitter?.image)
                if (twitterImageUrl) return [twitterImageUrl]
                if (ogImage) return [ogImage]
                return []
            })(),
        },
    }

    return metadata
}

export async function generateStaticParams() {
    const posts = await getPosts()

    // Add null check and filter out any posts without slugs
    return posts
        ?.filter((post: Post) => post?.slug)
        .map((post: Post) => ({
            slug: post.slug,
        })) || []
}

export default async function BlogPost(props: Props) {
    const params = await props.params;
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    // Safe image handling for the main content
    const getImageUrl = (image: { asset?: { _ref: string } }): string | null => {
        try {
            if (!image?.asset) {
                return null
            }
            const imageUrl = urlForImage(image)?.url()
            return imageUrl || null
        } catch (error) {
            console.warn('Error resolving image URL:', error)
            return null
        }
    }

    const mainImageUrl = getImageUrl(post.mainImage)
    const author: Author = await getAuthor(post.author.name)

    return (
        <BlogContent
            postId={post._id}
            content={post.body}
            title={post.title}
            mainImage={mainImageUrl ? {
                ...post.mainImage,
                url: mainImageUrl
            } : undefined}
            author={author}
            publishedAt={post.publishedAt}
            comments={post.comments}
        />
    )
}