import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./sanity.client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource | string) => {
    if (typeof source === 'string' || !source || !('asset' in source)) return;
    const dimensions = source.asset?._ref.split("-")[2];

    const [width, height] = dimensions
        ?.split("x")
        .map((num: string) => parseInt(num, 10));

    const url = imageBuilder
        .image(source)
        .auto("format")
        .width(Math.min(width, 2000))
        .url();

    return {
        src: url,
        width: width,
        height: height
    };
};
