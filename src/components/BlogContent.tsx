import { PortableText, PortableTextMarkComponentProps } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'
import { Post, SanityImage, Author, Comment } from '@/types'
import Link from 'next/link'
import AuthorCard from '@/components/AuthorCard'
import Comments from '@/components/Comments'
import CommentForm from '@/components/CommentForm'


function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}


export interface BlogContentProps {
    content: Post['body']
    title: string
    mainImage?: SanityImage
    author: Author
    publishedAt: string
    comments: Comment[]
    postId: string
}

export default async function BlogContent({ content, title, mainImage, author, publishedAt, comments, postId }: BlogContentProps) {
    const authorImageUrl = author?.image ? urlForImage(author.image)?.url() : null
    const mainImageUrl = mainImage ? urlForImage(mainImage)?.url() : null
    const formattedDate = formatDate(publishedAt)


    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold text-center mb-12 font-permanent-marker text-black inline-block relative">
                <span className="relative z-10">{title}</span>
                <span
                    className="absolute -inset-x-4 inset-y-0 block bg-secondary/20 -skew-y-3 -z-10"
                    aria-hidden="true"
                ></span>
            </h1>
            <div className="mb-8">
                {author && (
                    <div className="flex items-center mb-4">
                        {authorImageUrl && (
                            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                                <Image
                                    src={authorImageUrl}
                                    alt={author.name || ''}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <p className="text-dark font-medium">{author.name}</p>
                            <p className="text-tertiary text-sm">
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {mainImageUrl && (
                <div className="relative w-full h-[400px] mb-8">
                    <Image
                        src={mainImageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            <div className="max-w-none">
                <PortableText
                    value={content}
                    components={{
                        types: {
                            image: ({ value }: { value: SanityImage }) => {
                                const imageUrl = urlForImage(value)?.url()
                                return imageUrl ? (
                                    <div className="my-12">
                                        <div className="relative w-full h-[400px] my-8">
                                            <Image
                                                src={imageUrl}
                                                alt={value.alt || ''}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        {value.caption && (
                                            <div className="mt-2 text-center">
                                                <span className="inline-block text-sm text-secondary pt-2 px-4 italic font-light">
                                                    {value.caption}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : null
                            }
                        },
                        marks: {
                            link: ({ children, value }: PortableTextMarkComponentProps<{ _type: string; href: string }>) => {
                                return value?.href ? (
                                    <a href={value.href} target="_blank" rel="noopener noreferrer">
                                        {children}
                                    </a>
                                ) : <>{children}</>
                            },
                            internalLink: ({ children, value }: PortableTextMarkComponentProps<{ _type: string; reference: { slug: { current: string } } }>) => {
                                return value?.reference?.slug?.current ? (
                                    <Link href={`/blog/${value.reference.slug.current}`}>
                                        {children}
                                    </Link>
                                ) : <>{children}</>
                            }
                        }
                    }}
                />
            </div>
            {author.name ? (
                <AuthorCard name={author.name} image={author.image || undefined} bio={author.bio} />
            ) : null}

            {comments && comments.length > 0 ? (
                <Comments comments={comments} />
            ) : (
                <div className="mt-16 pt-8 border-t border-dark">
                    <p className="text-dark text-center italic">
                        No comments yet. Be the first to comment!
                    </p>
                </div>
            )}

            <CommentForm postId={postId} />
        </article>
    )
} 