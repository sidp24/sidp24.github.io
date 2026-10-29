import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getNotes, type NoteMeta } from "@/lib/notes";

type Params = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  return (await import(`@/content/notes/${slug}.mdx`)) as { default: React.ComponentType; metadata: NoteMeta };
}

export async function generateStaticParams() {
  return (await getNotes({ includeDrafts: true })).map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await load(slug);
  return {
    title: metadata.title,
    description: metadata.summary,
    alternates: { canonical: `/notes/${slug}/` },
    openGraph: { type: "article", title: metadata.title, description: metadata.summary },
    ...(metadata.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const { default: Body, metadata } = await load(slug);

  return (
    <article className="pt-14 sm:pt-20">
      <Link href="/notes/" className="kicker hover:text-ink">
        ← Notes
      </Link>
      <h1 className="rise mt-4 max-w-3xl text-[2.2rem] leading-[1.1] font-medium tracking-tight text-balance sm:text-[2.9rem]">{metadata.title}</h1>
      <p className="kicker mt-4">
        {formatDate(metadata.date)}
        {metadata.draft && <span className="ml-3 text-margin">Draft · unlisted</span>}
      </p>
      <p className="mt-4 max-w-2xl text-[1.2rem] leading-relaxed text-muted text-pretty">{metadata.summary}</p>
      <div className="prose-notebook mt-10 border-t border-rule pt-8">
        <Body />
      </div>
    </article>
  );
}
