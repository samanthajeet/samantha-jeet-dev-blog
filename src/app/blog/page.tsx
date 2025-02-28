import { client } from '../../../lib/sanity.client';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '../../../lib/sanity.image';

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    publishedAt: string;
    excerpt: string;
    author: {
        name: string;
        image: any;
    };
}

async function getPosts() {
    const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      author->{
        name,
        image
      }
    }
  `);
    return posts;
}
function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export default async function Blog() {
    const posts = await getPosts();

    return (
        <div className="py-12">
            <h1 className="text-4xl font-bold text-center mb-12 font-permanent-marker">Blog Posts</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: Post) => (
                    <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {post.mainImage && (
                            <div className="relative h-48">
                                <Image
                                    src={urlForImage(post.mainImage)?.url() || ''}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-brand-coral">
                                <Link
                                    href={`/blog/${post.slug.current}`}
                                    className="font-sans text-dark hover:bg-secondary hover:text-light transition-colors duration-200"
                                >
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                {formatDate(post.publishedAt)}
                            </p>
                            <p className="text-gray-500 mb-4 font-sans">{post.excerpt}</p>
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
                    </article>
                ))}
            </div>
        </div>
    );
} 