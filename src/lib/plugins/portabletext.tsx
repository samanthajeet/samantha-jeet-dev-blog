import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock, PortableText as PortableTextComponent, PortableTextMarkComponentProps, PortableTextReactComponents } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity.image";
import { SanityImage } from '@/types'


// Barebones lazy-loaded image component
const ImageComponent = ({ value }: { value: SanityImage }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <div>
      <Image
        src={urlForImage(value)?.url() || ''}
        alt={value.alt || 'Image'}
        loading="lazy"
        className="object-cover"
        sizes="(max-width: 800px) 100vw, 800px"
        width={800}
        height={800}
      />
      {value.caption && (
        <figcaption className="mt-2 text-center text-[10px] text-dark italic">
          {value.caption}
        </figcaption>

      )}
    </div>
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
        <a href={value?.href} rel={rel} target={target} className="text-secondary hover:text-tertiary/80 transition-colors">
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }: PortableTextMarkComponentProps<{ _type: string; reference: { slug: { current: string } } }>) => {
      return (
        <Link href={`/blog_v2/${value?.reference?.slug?.current}`}>{children}</Link>
      );
    }
  },
  block: {
    h1: (props: { children: React.ReactNode }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-dark">{props.children}</h1>,
    h2: (props: { children: React.ReactNode }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-dark border-b-[2px] border-retroBlue">{props.children}</h2>,
    h3: (props: { children: React.ReactNode }) => <h3 className="text-xl font-bold mt-6 mb-3 text-dark">{props.children}</h3>,
    h4: (props: { children: React.ReactNode }) => <h4 className="text-l font-bold mt-4 mb-2 text-dark">{props.children}</h4>,
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-dark my-6 first:mt-0 last:mb-0 font-sans">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-3 border-secondary pl-4 my-4 italic text-dark/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="mt-xl list-disc list-inside">{children}</ul>,
    number: ({ children }: { children: React.ReactNode }) => <ol className="mt-lg list-decimal list-inside">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }: { children: React.ReactNode }) => <ol className="m-auto text-lg">{children}</ol>,
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: { children: React.ReactNode }) => <li style={{ listStyleType: 'disclosure-closed' }} className="marker:text-secondary">{children}</li>,

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }: { children: React.ReactNode }) => <li>✅ {children}</li>,
  },
  normal: ({ children }: { children: React.ReactNode }) => (
    <p className="text-dark my-6 first:mt-0 last:mb-0 font-sans">
      {children}
    </p>
  ),
};
// Set up Portable Text serialization
export const PortableText = (props: { value: PortableTextBlock[] }) => (
  <PortableTextComponent components={components as unknown as PortableTextReactComponents} value={props.value} />
);
