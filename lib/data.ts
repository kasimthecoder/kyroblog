import { kyroClient } from "@/utils/kyrocms";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  coverImage: string | null;
  date: string;
  author: string | null;
  readingTime: string | null;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  pagination: PaginationMeta;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(post: any): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content.content,
    coverImage: post.featuredImage,
    date: post.createdAt,
    author: post.content.author,
    readingTime: post.content.readingTime,
  };
}

export async function getAllPosts(
  page = 1,
  take = 10,
): Promise<PaginatedPosts | undefined> {
  const posts = await kyroClient
    .entries()
    .list(process.env.KYRO_CMS_COLLECTION_SLUG as string, { page, take });

  if (!posts.success) return undefined;

  return {
    posts: posts.data.map(mapPost),
    pagination: posts.pagination ?? {
      currentPage: page,
      totalPages: 1,
      totalItems: posts.data.length,
      itemsPerPage: take,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await kyroClient
    .entries()
    .get(process.env.KYRO_CMS_COLLECTION_SLUG as string, slug);
  if (!posts.success) return undefined;
  return {
    slug: posts.data.slug,
    title: posts.data.title,
    excerpt: posts.data.excerpt,
    content: posts.data.content.content,
    coverImage: posts.data.featuredImage,
    date: posts.data.createdAt,
    author: posts.data.content.author,
    readingTime: posts.data.content.readingTime,
  } as BlogPost;
}

type HomePage = {
  heading: string;
  description: string;
  is_live: boolean;
};

export async function getHomePage(): Promise<HomePage | undefined> {
  const page = await kyroClient.pages().get("home-page-9670a3a2");
  if (!page.success) return undefined;
  return {
    heading: page.data.content?.heading,
    description: page.data.content?.description,
    is_live: page.data.content?.is_live,
  } as HomePage;
}
