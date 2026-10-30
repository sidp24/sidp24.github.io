import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { nav, site } from "@/content/site";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#161210" },
  ],
};

// Applies a saved theme before first paint so there's no flash of the wrong one.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-serif">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-paper focus:px-3 focus:py-2">
          Skip to content
        </a>
        <div aria-hidden="true" className="h-[3px]" style={{ background: "var(--accent)" }} />
        <Nav items={nav} />
        <main id="main" className="mx-auto w-full max-w-[68rem] px-4 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
