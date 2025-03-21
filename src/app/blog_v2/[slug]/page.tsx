import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "../../../lib/sanity.client";

export async function generateStaticParams() {
    return await getAllPostsSlugs();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    return { title: post.title, description: post.excerpt };
}

export default async function PostDefault({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    return <PostPage post={post} />;
}

// export const revalidate = 60;
