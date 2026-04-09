export default function DetailLoading() {
  return (
    <main>
      {/* Project header skeleton */}
      <div className="w-full py-detail px-content-x">
        <div className="max-w-column mx-auto flex flex-col gap-4">
          <div className="h-4 w-32 bg-surface-1 animate-pulse" />
          <div className="h-20 w-full bg-surface-1 animate-pulse" />
          <div className="h-5 w-3/4 bg-surface-1 animate-pulse" />
        </div>
      </div>
      {/* Hero image skeleton */}
      <div className="w-full aspect-video max-h-[748px] bg-surface-1 animate-pulse border-y border-surface-2" />

      {/* Section skeletons */}
      {[1, 2].map((i) => (
        <div key={i} className="w-full border-b border-surface-2">
          <div className="max-w-frame mx-auto px-content-x py-section flex flex-col gap-10">
            <div className="max-w-column flex flex-col gap-3">
              <div className="h-4 w-24 bg-surface-1 animate-pulse" />
              <div className="h-10 w-2/3 bg-surface-1 animate-pulse" />
              <div className="h-4 w-full bg-surface-1 animate-pulse" />
              <div className="h-4 w-4/5 bg-surface-1 animate-pulse" />
            </div>
            <div className="w-full aspect-video bg-surface-1 animate-pulse" />
          </div>
        </div>
      ))}
    </main>
  );
}
