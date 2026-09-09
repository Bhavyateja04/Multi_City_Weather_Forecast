import { CloudSun } from "lucide-react";

function EmptyState() {
  return (
    <div
      data-testid="empty-state"
      className="rounded-3xl bg-white p-12 text-center shadow-sm"
    >
      <CloudSun
        size={64}
        className="mx-auto mb-4 text-blue-500"
      />

      <h2 className="text-xl font-bold">
        No cities added
      </h2>

      <p className="mt-2 text-slate-500">
        Search for a city to add it to
        your dashboard.
      </p>
    </div>
  );
}

export default EmptyState;