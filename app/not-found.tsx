import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 pb-12">
      <p className="kicker">Fig. 404</p>
      <h1 className="mt-3 text-[2.6rem] leading-tight font-medium tracking-tight">No signal at this address.</h1>
      <p className="mt-4 max-w-xl text-[1.15rem] text-muted">
        The page you&apos;re looking for doesn&apos;t exist. It may have moved when this site was rebuilt.
      </p>
      <Link href="/" className="link mt-8 inline-block text-[1.05rem]">
        ← Back to the front page
      </Link>
    </div>
  );
}
