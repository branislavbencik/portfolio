export default function CaseStudyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-full border border-surface-2">
      {children}
    </div>
  );
}
