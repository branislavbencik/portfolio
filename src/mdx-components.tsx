import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => (
      <p className="type-body leading-normal text-text-secondary">{children}</p>
    ),
    ol: ({ children }) => (
      <ol
        className="list-decimal list-outside type-body leading-normal text-text-secondary pl-[1.25em]"
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        className="type-body text-text-secondary pl-[0.25em]"
      >
        {children}
      </li>
    ),
    ...components,
  };
}
