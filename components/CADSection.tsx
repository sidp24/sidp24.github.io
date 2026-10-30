"use client";

import dynamic from "next/dynamic";

const STLViewer = dynamic(() => import("./STLViewer"), { ssr: false });

export default function CADSection() {
  return <STLViewer />;
}
