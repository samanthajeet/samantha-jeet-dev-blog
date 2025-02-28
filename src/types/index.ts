import { PortableTextBlock } from "@portabletext/react"

export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
    alt?: string
    caption?: string
}

export interface Post {
    _id: string
    title: string
    slug: {
        current: string
    }
    mainImage?: SanityImage
    excerpt?: string
    body: PortableTextBlock[]
    publishedAt: string
    author?: {
        name: string
        image?: SanityImage
    }
} 