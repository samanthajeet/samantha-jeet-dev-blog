import PostPage from "./default";
import { urlForImage } from '@/lib/sanity.image'
import { getAllPostsSlugs, getPostBySlug } from "../../../lib/sanity.client";
import { Metadata } from 'next'

export async function generateStaticParams() {
    return await getAllPostsSlugs();
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);
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
    };
    return metadata;
}

export default async function PostDefault(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);
    return <PostPage post={post} />;
}

// export const revalidate = 60;
