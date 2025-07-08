import { parseISO, format } from "date-fns";
import CategoryLabel from "./category";
import { Post } from "@/types";

interface SidebarProps {
    post: Post;
}

export default function Sidebar({ post }: SidebarProps) {
    return (
        <aside className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
                {/* Post Info */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">About this post</h3>
                    <div className="space-y-3 text-sm">
                        <p>Published: {format(parseISO(post?.publishedAt || post._createdAt), "MMMM dd, yyyy")}</p>
                        <p>{post.estReadingTime || "5"} min read</p>
                        {post.categories && (
                            <div>
                                <p className="mb-2">Categories:</p>
                                <CategoryLabel categories={post.categories} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Posts */}
                {/* {post.related && post.related.length > 0 && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                        <div className="space-y-4">
                            {post.related.map((relatedPost) => (
                                <Link
                                    key={relatedPost.slug.current}
                                    href={`/blog_v2/${relatedPost.slug.current}`}
                                    className="block hover:bg-gray-100 p-2 rounded-lg transition"
                                >
                                    <h4 className="font-medium">{relatedPost.title}</h4>
                                    <time className="text-sm text-gray-600">
                                        {format(parseISO(relatedPost.date), "MMMM dd, yyyy")}
                                    </time>
                                </Link>
                            ))}
                        </div>
                    </div>
                )} */}

                {/* Categories Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        <CategoryLabel categories={post.categories} />
                    </div>
                </div>
            </div>
        </aside>
    );
}