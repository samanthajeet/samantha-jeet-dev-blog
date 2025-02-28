'use client'

import { client } from '@/sanity/lib/client'
import { SanityImage } from '@/types'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImage) {
    return builder.image(source)
} 