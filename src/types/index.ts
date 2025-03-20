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
    _id: string
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
    bio?: PortableTextBlock[] | undefined
}
export interface Post {
    _id: string
    title: string
    slug: string
    mainImage?: SanityImage
    excerpt?: string
    body: PortableTextBlock[]
    publishedAt: string
    categories: Category[]
    author: Author
    comments: Comment[]
}

export interface Comment {
    _id: string
    name: string
    text: string
    createdAt: string
    post: Post
    approved: boolean
}
