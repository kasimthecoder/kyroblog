import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BlogContent } from "@/components/blog-content";
import { getAllPosts, getPostBySlug } from "@/lib/data";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: post.coverImage ?? "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage ?? ""],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ?? "",
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
  };
  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Button
        variant="link"
        size="sm"
        asChild
        className="px-0 text-muted-foreground"
      >
        <Link href="/">&larr; All posts</Link>
      </Button>
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </header>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border mb-10">
        <Image
          src={post.coverImage ?? ""}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
          priority
        />
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-7">
        <BlogContent html={post.content} />
      </div>
      <Separator className="my-10" />
      <Button variant="outline" asChild>
        <Link href="/">Back to all posts</Link>
      </Button>
    </article>
  );
}
