import type { MDXComponents } from "mdx/types";
import Figure from "@/components/Figure";
import Tex from "@/components/Tex";

// Available inside every note without an import.
const components: MDXComponents = {
  Figure,
  Tex,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
