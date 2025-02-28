import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'
import { SanityImage } from '@/types'

interface AuthorProps {
    name: string
    image?: SanityImage
    bio?: string
}

export default function AuthorCard({ name, image, bio }: AuthorProps) {
    return (
        <div className="mt-16 pt-8 border-t border-brand-navy/10">
            <div className="flex items-start gap-6">
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
                    <h3 className="text-xl font-semibold text-brand-navy mb-2">
                        Written by {name}
                    </h3>
                    {bio && (
                        <p className="text-brand-navy/80 leading-relaxed">
                            {bio}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
} 