import { groq } from "next-sanity"


export const postquery = groq`
*[_type == "post" && defined(publishedAt) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`;

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "slug": slug.current,
    mainImage {
      asset->,
      alt,
      caption,
      "blurDataURL":asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
    },
    publishedAt,
    excerpt,
    categories[]->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    author->{
      _id,
      name,
      image,
      slug,
      bio
    }
  }
`

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
  comments[]->,
  openGraph,
}
`;

export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const singlePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    mainImage {
      asset->,
      alt,
      caption
    },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    excerpt,
    author->{
      name,
      image {
        asset->
      },
      bio
    },
    publishedAt,
    comments[]->,
    categories[]->,
    openGraph,
    twitter
  }
`

export const pathsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    color,
    value,
    description
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && $slug in categories[]->slug.current] {
    ...,
    author->,
    categories[]->
  }
`

export const postCommentsQuery = groq`
  *[_type == "comment" && post._ref == $postId] {
    ...,
    post->
  }
`

export const singleAuthorQuery = groq`
  *[_type == "author" && name == $name][0] {
    name,
    image,
    bio
  }
`