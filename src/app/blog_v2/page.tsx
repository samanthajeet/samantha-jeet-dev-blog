import AltHome from "./alternative";

import { getAllPosts } from "@/lib/sanity.client";

export const dynamic = 'force-dynamic';
// or if you want some caching but more frequent updates:
// export const revalidate = 0;

export default async function AltHomePage() {
    const posts = await getAllPosts();
    return <AltHome posts={posts} />;
}