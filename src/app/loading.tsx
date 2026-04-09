export default function LandingLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <div className="max-w-column mx-auto px-content-x pt-20 pb-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="h-16 w-full bg-surface-1 animate-pulse" />
          <div className="h-16 w-4/5 bg-surface-1 animate-pulse" />
        </div>
        <div className="grid grid-cols-3 border border-surface-2 divide-x divide-surface-2">
          <div className="h-28 bg-surface-1 animate-pulse" />
          <div className="h-28 bg-surface-1 animate-pulse" />
          <div className="h-28 bg-surface-1 animate-pulse" />
        </div>
      </div>

      {/* Card list skeleton */}
      <div className="w-full max-w-frame mx-auto flex flex-col pb-section">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="py-detail px-content-x flex flex-col gap-10 border-t border-b border-surface-2 -mt-px first:mt-0"
          >
            <div className="h-8 w-2/3 bg-surface-1 animate-pulse" />
            <div className="w-full aspect-video bg-surface-1 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
