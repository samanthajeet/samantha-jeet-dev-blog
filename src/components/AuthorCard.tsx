import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'
import { SanityImage } from '@/types'
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

interface AuthorProps {
    name: string
    image?: SanityImage
    bio?: PortableTextBlock[]
}

export default function AuthorCard({ name, image, bio }: AuthorProps) {
    return (
        <div className="mt-4 pt-4 border-t border-dark">
            <div className="flex items-center gap-6 bg-dark/5 p-4 rounded-lg" >
                {image && (
                    <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={urlForImage(image)?.url() || ''}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-sans text-dark mb-2">
                        by <span className="font-permanent-marker">{name}</span>
                    </h3>
                    {bio && (
                        <PortableText value={bio} />
                    )}
                </div>
            </div>
        </div>
    )
} 