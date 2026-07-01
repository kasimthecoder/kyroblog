"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = container.querySelectorAll("pre code");

    blocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);

      const pre = block.parentElement;
      if (!pre || pre.querySelector(".copy-btn")) return;

      pre.classList.add("relative", "group");

      const button = document.createElement("button");
      button.className =
        "copy-btn absolute top-2 right-2 rounded-md border border-border bg-background/80 px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground hover:bg-muted";
      button.type = "button";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        const code = block.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copied";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1500);
        } catch {
          button.textContent = "Failed";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1500);
        }
      });

      pre.appendChild(button);
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
