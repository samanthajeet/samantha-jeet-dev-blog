import PostPage from "./default";
import { urlForImage } from '@/lib/sanity.image'
import { getAllPostsSlugs, getPostBySlug } from "../../../lib/sanity.client";
import { Metadata } from 'next'

export async function generateStaticParams() {
    return await getAllPostsSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    return {
        title: post.seoTitle || post.title,
        description: post.metaDescription || post.excerpt,
        keywords: post.keywords,
        robots: post.isIndexed ? 'index, follow' : 'noindex, nofollow',
        openGraph: {
            title: post.openGraph?.title || post.seoTitle || post.title,
            description: post.openGraph?.description || post.metaDescription || post.excerpt,
            type: post.openGraph?.type || 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author?.name],
            images: post.openGraph?.image ? [
                {
                    url: urlForImage(post.openGraph.image)?.url() || '',
                    alt: post.openGraph.image.alt || '',
                }
            ] : [],
        },
        alternates: {
            canonical: `https://yourdomain.com/blog/${post.slug.current}`,
            languages: {
                [post.language || 'en']: `/blog/${post.slug.current}`,
            },
        },
    }
}

export default async function PostDefault(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);
    return <PostPage post={post} />;
}

// export const revalidate = 60;
