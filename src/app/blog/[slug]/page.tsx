import { getAuthor, getPosts } from '../../../lib/sanity.client';
import BlogContent from '@/components/BlogContent';
import { getPost } from '../../../lib/sanity.client';
import { Author, Post } from '@/types';


export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post: Post | null = await getPost(params.slug);

    return {
        title: post?.title || 'Blog Post',
        description: post?.excerpt || 'Blog post on my personal website',
    };
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

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post: Post = await getPost(params.slug);
    const author: Author = await getAuthor(post.author.name);

    if (!post) {
        return <div>Post not found</div>;
    }

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