import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug } from "../../../lib/sanity.client";

export async function generateStaticParams() {
    return await getAllPostsSlugs();
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);
    return { title: post.title, description: post.excerpt };
}

export default async function PostDefault(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);
    return <PostPage post={post} />;
}

// export const revalidate = 60;
