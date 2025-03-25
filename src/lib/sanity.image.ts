import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './sanity.client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
const imageBuilder = createImageUrlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
});

export function urlForImage(source: SanityImageSource | string) {
    if (typeof source === 'string' || !source) {
        return null;
    }

    if (!('asset' in source)) {
        return null;
    }

    try {
        return imageBuilder.image(source);
    } catch (error) {
        console.warn('Error building image URL:', error);
        return null;
    }
} 
