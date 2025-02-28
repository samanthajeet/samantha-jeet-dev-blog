'use client'

import { PortableText, PortableTextMarkComponentProps } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '../../lib/sanity.image'
import { Post, SanityImage } from '@/types'
import Link from 'next/link'

interface BlogContentProps {
    content: Post['body']
    title: string
    mainImage?: SanityImage
    author?: {
        name: string
        image?: SanityImage
    }
    publishedAt: string
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export default function BlogContent({ content, title, mainImage, author, publishedAt }: BlogContentProps) {
    const authorImageUrl = author?.image ? urlForImage(author.image)?.url() : null
    const mainImageUrl = mainImage ? urlForImage(mainImage)?.url() : null
    const formattedDate = formatDate(publishedAt)

    return (
        <article className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold mb-4 font-permanent-marker">{title}</h1>
            <div className="mb-8">
                {author && (
                    <div className="flex items-center mb-4">
                        {authorImageUrl && (
                            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                                <Image
                                    src={authorImageUrl}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <p className="text-brand-navy font-medium">{author.name}</p>
                            <p className="text-brand-sage text-sm">
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
            <div className="prose max-w-none">
                <PortableText
                    value={content}
                    components={{
                        types: {
                            image: ({ value }: { value: SanityImage }) => {
                                const imageUrl = urlForImage(value)?.url()
                                return imageUrl ? (
                                    <div className="relative w-full h-[400px] my-8">
                                        <Image
                                            src={imageUrl}
                                            alt={value.alt || ''}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
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
        </article>
    )
} 