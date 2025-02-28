'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '../../lib/sanity.image'
import { portableTextComponents } from './PortableTextComponents'

interface BlogContentProps {
    content: any[]
    title: string
    mainImage?: any
    author?: {
        name: string
        image?: any
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
                    components={portableTextComponents}
                />
            </div>
        </article>
    )
} 