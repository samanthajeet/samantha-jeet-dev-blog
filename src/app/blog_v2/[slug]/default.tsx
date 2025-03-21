import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/plugins/portabletext";
import { urlForImage } from "@/lib/sanity.image";
import { parseISO, format } from "date-fns";
import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/AuthorCard";
import { getPost } from "@/lib/sanity.client";
import type { SanityImage, Post } from "@/types";

interface Props {
    post: Post
}

export default async function Post(props: Props) {
    const post = await getPost(props.post.slug)

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

    const getImageUrl = (image: string) => {
        try {
            if (!image) {
                return null
            }
            const imageUrl = urlForImage(image)?.url()
            return imageUrl || null
        } catch (error) {
            console.warn('Error resolving image URL:', error)
            return null
        }
    }


    const mainImageUrl = getImageUrl(post.mainImage)

    return (
        <>
            <Container className="!pt-0">
                <div className="mx-auto max-w-screen-md ">
                    <div className="flex justify-center">
                        <CategoryLabel categories={post.categories} />
                    </div>

                    <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                        {post.title}
                    </h1>

                    <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 flex-shrink-0">
                                {AuthorimageProps && (
                                    <Link href={`/author/${post.author.slug.current}`}>
                                        <Image
                                            src={post.author.image?.asset?.url}
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
                {imageProps && (
                    <Image
                        src={mainImageUrl || ''}
                        alt={post.mainImage?.alt || "Thumbnail"}
                        loading="eager"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
            </div>

            <Container>
                <article className="mx-auto max-w-screen-md ">
                    <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
                        {post.body && <PortableText value={post.body} />}
                    </div>
                    <div className="mb-7 mt-7 flex justify-center">
                        <Link
                            href="/blog_v2/"
                            className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
                            ← View all posts
                        </Link>
                    </div>
                    {post.author && <AuthorCard name={post.author.name} image={post.author.image} bio={post.author.bio} />}
                </article>
            </Container>
        </>
    );
}

const MainImage = ({ image }: { image: SanityImage }) => {
    return (
        <div className="mb-12 mt-12 ">
            <Image src={""} {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
            <figcaption className="text-center ">
                {image.caption && (
                    <span className="text-sm italic text-gray-600 dark:text-gray-400">
                        {image.caption}
                    </span>
                )}
            </figcaption>
        </div>
    );
};
