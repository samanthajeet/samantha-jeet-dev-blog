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

const getImageUrl = (image: any): string | null => {
    try {
        if (!image?.asset) {
            return null;
        }
        return urlForImage(image)?.url() || null;
    } catch (error) {
        console.warn('Error resolving image URL:', error);
        return null;
    }
};

export default async function Blog() {
    const posts: Post[] = await getPosts();

    // Filter out posts without slugs and ensure they have valid slugs
    const validPosts = posts.filter(post => {
        if (typeof post.slug === 'string') {
            return post.slug;
        }
        return post.slug;
    });

    return (
        <div className="py-12 px-4">
            <div className="flex justify-center">
                <h1 className="text-5xl font-bold text-center mb-12 font-permanent-marker text-dark inline-block relative">
                    <span className="relative z-10">Blog Posts</span>
                    <span
                        className="absolute -inset-x-4 inset-y-0 block bg-secondary/20 -skew-y-3 -z-10"
                        aria-hidden="true"
                    ></span>
                </h1>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {validPosts.map((post: Post) => (
                    <article key={post._id} className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-all duration-300 border-2 border-dark/10">
                        {post.mainImage && (
                            <div className="relative aspect-square">
                                <div className="absolute inset-0 bg-dark/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                                {getImageUrl(post.mainImage) ? (
                                    <Image
                                        src={getImageUrl(post.mainImage) || ''}
                                        alt={post.mainImage.alt || post.title}
                                        fill
                                        className="object-cover filter saturate-[0.9] group-hover:saturate-100 transition-all duration-300"
                                    />
                                ) : null}
                            </div>
                        )}
                        <div className="px-6 pt-4">
                            <p className="text-dark font-sans text-sm mb-4">
                                {formatDate(post.publishedAt)}
                            </p>
                        </div>
                        <div className="px-6 pb-4 flex flex-col flex-1">
                            <div className="flex-1">
                                <h2 className="text-[1.25rem] font-bold mb-2">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="font-sans text-dark relative z-10 inline-block"
                                    >
                                        <span className="relative inline-block w-full">
                                            {post.title}
                                            <span
                                                className="absolute -inset-x-2 inset-y-0 block bg-primary/20 -skew-y-3 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 w-[calc(100%+1rem)]"
                                                aria-hidden="true"
                                            ></span>
                                        </span>
                                    </Link>
                                </h2>
                            </div>

                            <div className="mt-auto pt-4 border-t border-dark/20">
                                {post.author && (
                                    <div className="flex items-center mb-3">
                                        {post.author.image && getImageUrl(post.author.image) && (
                                            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                                                <Image
                                                    src={getImageUrl(post.author.image) || ''}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="text-sm text-dark font-medium">{post.author.name}</span>
                                    </div>
                                )}
                                {post.categories && post.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories.map((cat) => (
                                            <span
                                                key={cat.slug.current}
                                                className="text-[.7rem] px-2 py-1 border-1 uppercase"
                                                style={{
                                                    color: cat.color,
                                                    borderColor: cat.color,
                                                    backgroundColor: `${cat.color}10`
                                                }}
                                            >
                                                {cat.title}
                                            </span>
                                        ))}
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