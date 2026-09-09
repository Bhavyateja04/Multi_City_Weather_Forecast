function SkeletonLoader() {
  return (
    <div
      data-testid="weather-card-skeleton"
      className="animate-pulse rounded-3xl bg-white p-6 shadow-sm"
    >
      <div className="mb-6 h-6 w-32 rounded bg-slate-200" />

      <div className="mb-4 h-14 w-28 rounded bg-slate-200" />

      <div className="mb-6 h-4 w-40 rounded bg-slate-200" />

      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 rounded-xl bg-slate-200" />
        <div className="h-16 rounded-xl bg-slate-200" />
        <div className="h-16 rounded-xl bg-slate-200" />
      </div>

      <div className="mt-6 h-48 rounded-xl bg-slate-200" />
    </div>
  );
}

export default SkeletonLoader;