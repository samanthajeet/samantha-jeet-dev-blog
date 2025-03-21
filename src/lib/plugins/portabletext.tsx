import Image from "next/image";
import Link from "next/link";
import { PortableText as PortableTextComponent, PortableTextMarkComponentProps, PortableTextProps } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity.image";
import { SanityImage } from '@/types'


// Barebones lazy-loaded image component
const ImageComponent = ({ value }: { value: SanityImage }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      src={urlForImage(value)?.url() || ''}
      alt={value.alt || 'Image'}
      loading="lazy"
      className="object-cover"
      sizes="(max-width: 800px) 100vw, 800px"
      width={800}
      height={800}
    />
  );
};


const components = {
  types: {
    image: ImageComponent,

  },
  marks: {
    center: (props: { children: React.ReactNode }) => (
      <div className="text-center">{props.children}</div>
    ),
    highlight: (props: { children: React.ReactNode }) => (
      <span className="font-bold text-blue-500">
        {props.children}
      </span>
    ),
    link: ({ children, value }: PortableTextMarkComponentProps<{ _type: string; href: string }>) => {
      const rel = !value?.href?.startsWith("/")
        ? "noopener"
        : undefined;
      const target = !value?.href?.startsWith("/")
        ? "_blank"
        : undefined;
      return (
        <a href={value?.href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }: PortableTextMarkComponentProps<{ _type: string; reference: { slug: { current: string } } }>) => {
      return (
        <Link href={`/blog_v2/${value?.reference?.slug?.current}`}>{children}</Link>
      );
    }
  }
};
// Set up Portable Text serialization
export const PortableText = (props: PortableTextProps) => (
  <PortableTextComponent components={components} {...props} />
);
