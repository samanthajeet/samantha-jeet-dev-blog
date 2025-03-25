'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '../lib/sanity.image'
import { SanityImage } from '@/types'

const getImageUrl = (image: SanityImage): string | null => {
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

export const portableTextComponents = {
    types: {
        image: ({ value }: { value: SanityImage }) => {
            const imageUrl = getImageUrl(value)
            if (!imageUrl) return null
            return (
                <figure className="my-12">
                    <div className="relative w-full h-[400px]">
                        <Image
                            src={imageUrl}
                            alt={value.alt || ''}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-2 text-center text-sm text-gray-600 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        }
    },
    marks: {
        link: ({ value, children }: { value: { href: string }, children: React.ReactNode }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <Link
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-secondary hover:text-secondary/80 transition-colors"
                >
                    {children}
                </Link>
            )
        },
        internalLink: ({ value, children }: { value: { reference: { slug: { current: string } } }, children: React.ReactNode }) => {
            return (
                <Link
                    href={`/blog/${value?.reference?.slug?.current}`}
                    className="text-secondary hover:text-secondary/80 transition-colors"
                >
                    {children}
                </Link>
            )
        }
    },
    block: {
        normal: ({ children }: { children: React.ReactNode }) => (
            <p className="text-dark my-6 first:mt-0 last:mb-0 font-sans">
                {children}
            </p>
        ),
        h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-dark">{children}</h1>,
        h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-dark">{children}</h2>,
        h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-dark">{children}</h3>,
        h4: ({ children }: { children: React.ReactNode }) => <h4 className="text-xl font-bold mt-4 mb-2 text-dark">{children}</h4>,
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-l-4 border-light pl-4 my-4 italic text-dark/80">
                {children}
            </blockquote>
        ),
    }
} 