import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './sanity.client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
const imageBuilder = createImageUrlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
});

export const urlForImage = (source: SanityImageSource) => {
    if (!source) {
        return undefined;
    }
    return imageBuilder.image(source);
}; 