import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="w-full max-w-frame mx-auto px-content-x py-detail flex flex-col gap-6">
      <p className="type-allcaps text-text-tertiary">404</p>
      <h1 className="type-display text-text-primary">Page not found.</h1>
      <p className="type-body-m text-text-secondary max-w-text">
        This page doesn't exist or was moved.
      </p>
      <Link
        href="/"
        className="type-body-s text-text-primary underline underline-offset-4 hover:opacity-50 transition-opacity w-fit"
      >
        Back to home
      </Link>
    </main>
  );
}
