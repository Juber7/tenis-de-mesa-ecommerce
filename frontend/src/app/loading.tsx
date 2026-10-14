import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="shell py-12" role="status" aria-label="Cargando productos">
      <Skeleton className="mb-8 h-12 w-2/3 rounded-xl" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n}>
            <Skeleton className="aspect-square" />
            <Skeleton className="mt-4 h-7 w-3/4" />
            <Skeleton className="mt-3 h-5 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
