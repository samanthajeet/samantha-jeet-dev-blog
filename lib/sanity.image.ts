import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './sanity.client';

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
});

export const urlForImage = (source: any) => {
    if (!source) {
        return undefined;
    }
    return imageBuilder.image(source);
}; 