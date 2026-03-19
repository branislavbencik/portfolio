import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => (
      <p className="text-[18px] leading-[1.5] text-foreground-secondary">{children}</p>
    ),
    ol: ({ children }) => (
      <ol
        className="list-decimal list-outside text-[18px] leading-[1.5] text-foreground-secondary"
        style={{ paddingLeft: "1.25em" }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        className="text-[18px] leading-[1.5] text-foreground-secondary"
        style={{ paddingLeft: "0.25em" }}
      >
        {children}
      </li>
    ),
    ...components,
  };
}
