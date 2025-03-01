import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '../../lib/sanity.image';
import { Post } from '@/types';
import { getPosts } from '../../lib/sanity.client';


function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export default async function Blog() {
    const posts: Post[] = await getPosts();

    return (
        <div className="py-12">
            <h1 className="text-4xl font-bold text-center mb-12 font-permanent-marker">Blog Posts</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: Post) => (
                    <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                        {post.mainImage && (
                            <div className="relative aspect-square">
                                <Image
                                    src={urlForImage(post.mainImage)?.url() || ''}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 px-6 mt-3 mb-3">
                                {post.categories.map((cat) => (
                                    <span
                                        key={cat.slug.current}
                                        className={`text-xs bg-brand-navy/5 rounded-full`} style={{ color: cat.color }}
                                    >
                                        {cat.title.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="px-6 pb-4 flex flex-col flex-1">
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold mb-2 text-brand-coral">
                                    <Link
                                        href={`/blog/${post.slug.current}`}
                                        className="font-sans text-dark hover:border-b-2 hover:border-secondary"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>

                                {/* <p className="text-gray-500 mb-4 font-sans">{post.excerpt}</p> */}
                            </div>

                            <div className="mt-auto">
                                <p className="text-gray-600 text-sm mb-4">
                                    {formatDate(post.publishedAt)}
                                </p>
                                {post.author && (
                                    <div className="flex items-center">
                                        {post.author.image && (
                                            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                                                <Image
                                                    src={urlForImage(post.author.image)?.url() || ''}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-600">{post.author.name}</span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
} 