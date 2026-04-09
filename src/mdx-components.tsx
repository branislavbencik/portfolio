import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => (
      <p className="type-body-l leading-normal text-text-secondary">{children}</p>
    ),
    ol: ({ children }) => (
      <ol
        className="list-decimal list-outside type-body-l leading-normal text-text-secondary pl-[1.25em]"
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        className="text-body-l leading-[1.4] text-text-secondary pl-[0.25em]"
      >
        {children}
      </li>
    ),
    ...components,
  };
}
