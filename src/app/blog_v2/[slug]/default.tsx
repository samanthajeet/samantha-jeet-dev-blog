import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/plugins/portabletext";
import { urlForImage } from "@/lib/sanity.image";
import { parseISO, format } from "date-fns";
import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/AuthorCard";
import type { SanityImage, Post } from "@/types";
import CommentForm from "@/components/CommentForm";
import Comments from '@/components/Comments'

interface Props {
    post: Post
}

export default async function Post(props: Props) {
    const post = props.post;
    const slug = post?.slug;

    if (!slug) {
        notFound();
    }

    const imageProps = post?.mainImage
        ? urlForImage(post?.mainImage)
        : null;

    const AuthorimageProps = post?.author?.image
        ? urlForImage(post.author.image)
        : null;

    const getImageUrl = (image: SanityImage | null): string | null => {
        try {
            if (!image || !image.asset) {
                return null;
            }
            const imageUrl = urlForImage(image)?.url();
            return imageUrl || null;
        } catch (error) {
            console.warn('Error resolving image URL:', error);
            return null;
        }
    };
    const mainImageUrl = getImageUrl(post?.mainImage || null)
    console.log(post.mainImage)
    console.log(post.mainImage?.caption)

    return (
        <>
            <Container className="!pt-0">
                <div className="mx-auto max-w-screen-md ">
                    <div className="flex justify-center mb-2">
                        <CategoryLabel categories={post.categories} />
                    </div>

                    <h1 className="text-5xl font-bold text-center mb-12 font-permanent-marker text-black inline-block relative">
                        <span className="relative z-10">{post.title}</span>
                        <span
                            className="absolute -inset-x-4 inset-y-0 block bg-secondary/20 -skew-y-3 -z-10"
                            aria-hidden="true"
                        ></span>
                    </h1>

                    <div className="mt-3 flex justify-center space-x-3 text-dark ">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 flex-shrink-0">
                                {AuthorimageProps && (
                                    <Link href={`/author/${post.author.slug.current}`}>
                                        <Image
                                            src={getImageUrl(post.author.image as SanityImage) || ''}
                                            alt={post?.author?.name}
                                            className="rounded-full object-cover"
                                            fill
                                            sizes="40px"
                                        />
                                    </Link>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-400">
                                    <Link href={`/author/${post.author.slug.current}`}>
                                        {post.author.name}
                                    </Link>
                                </p>
                                <div className="flex items-center space-x-2 text-sm">
                                    <time
                                        className="text-gray-500 dark:text-gray-400"
                                        dateTime={post?.publishedAt || post._createdAt}>
                                        {format(
                                            parseISO(post?.publishedAt || post._createdAt),
                                            "MMMM dd, yyyy"
                                        )}
                                    </time>
                                    <span>· {post.estReadingTime || "5"} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
                {imageProps && mainImageUrl && (
                    <div>
                        <Image
                            src={mainImageUrl}
                            alt={post.mainImage?.alt || "Thumbnail"}
                            loading="eager"
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                        {post.mainImage?.caption && (
                            <figcaption className="text-[10px] text-white italic absolute bottom-1 right-1 drop-shadow-sm">
                                {post.mainImage?.caption}
                            </figcaption>
                        )}
                    </div>
                )}
            </div>

            <Container>
                <article className="mx-auto max-w-screen-md ">
                    <div className="mx-auto my-3 a:text-tertiary text-dark">
                        {post.body && <PortableText value={post.body} />}
                    </div>
                    <div className="mb-7 mt-7 flex justify-center">
                        <Link
                            href="/blog_v2/"
                            className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
                            ← View all posts
                        </Link>
                    </div>
                    {post.author && <AuthorCard name={post.author.name} image={post.author.image || undefined} bio={post.author.bio} />}
                </article>
            </Container>
            <Container>
                {post.comments && post.comments.length > 0 ? (
                    <Comments comments={post.comments} />
                ) : (
                    <div className="mt-16 pt-8 border-t border-dark">
                        <p className="text-dark text-center italic">
                            No comments yet. Be the first to comment!
                        </p>
                    </div>
                )}

                <CommentForm postId={post._id} />
            </Container>
        </>
    );
}

