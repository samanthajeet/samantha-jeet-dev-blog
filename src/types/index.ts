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

export interface Category {
    color: string
    title: string
    value: string
    slug: {
        current: string
    }
}
export interface Author {
    name: string
    image?: SanityImage | undefined
    bio?: string | undefined
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
    categories: Category[]
    author: Author
}
