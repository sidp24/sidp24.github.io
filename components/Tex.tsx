import katex from "katex";

// Renders LaTeX at build time, so equations ship as HTML with no client JS.
export default function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, { displayMode: display, throwOnError: true, output: "htmlAndMathml" });
  return display ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <span dangerouslySetInnerHTML={{ __html: html }} />;
}
