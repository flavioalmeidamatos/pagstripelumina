export default function Loading() {
  return (
    <div className="container py-20">
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-full bg-secondary" />
        <div className="h-16 w-full animate-pulse rounded-[32px] bg-secondary" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-96 animate-pulse rounded-[32px] bg-secondary" />
          ))}
        </div>
      </div>
    </div>
  );
}

