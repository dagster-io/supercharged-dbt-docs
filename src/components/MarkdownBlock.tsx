"use client";
import ReactMarkdown from "react-markdown";

export function MarkdownBlock({ markdown }: { markdown: string }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
