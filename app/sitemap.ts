import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/data";

const siteUrl = process.env.SITE_BASE_URL;

async function getAllPostsForSitemap() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await getAllPosts(page, 100);
    if (!result) break;
    allPosts.push(...result.posts);
    hasMore = result.pagination.hasNextPage;
    page++;
  }

  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsForSitemap();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl ?? "https://blog.kyrocms.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postEntries,
  ];
}
