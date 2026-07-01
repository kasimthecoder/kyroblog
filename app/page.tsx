import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getAllPosts, getHomePage } from "@/lib/data";
import { kyroClient } from "@/utils/kyrocms";
import { SiteNotLive } from "@/components/site-not-live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const result = await getAllPosts(page, 9);
  const posts = result?.posts;
  const pagination = result?.pagination;

  const homePage = await getHomePage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          {homePage?.heading}
        </h1>
        <p className="mt-2 text-muted-foreground">{homePage?.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden transition-colors group-hover:bg-muted/50">
              <div className="relative aspect-video w-full">
                <Image
                  src={post.coverImage ?? ""}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg group-hover:underline underline-offset-4">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            href={`/?page=${pagination.currentPage - 1}`}
            aria-disabled={!pagination.hasPrevPage}
            className={`text-sm font-medium ${
              pagination.hasPrevPage
                ? "hover:underline underline-offset-4"
                : "pointer-events-none text-muted-foreground/40"
            }`}
          >
            ← Previous
          </Link>

          <span className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <Link
            href={`/?page=${pagination.currentPage + 1}`}
            aria-disabled={!pagination.hasNextPage}
            className={`text-sm font-medium ${
              pagination.hasNextPage
                ? "hover:underline underline-offset-4"
                : "pointer-events-none text-muted-foreground/40"
            }`}
          >
            Next →
          </Link>
        </div>
      )}
    </div>
  );
}
