/**
 * ProductCardSkeleton — placeholder used while shop products are loading.
 * Matches the visual rhythm of the actual product card.
 */
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => (
  <div className="glass clip-angle-lg overflow-hidden border border-primary/20">
    <Skeleton className="aspect-square w-full bg-foreground/5" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-7 w-1/2" />
      <Skeleton className="h-9 w-full" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div className="space-y-4">
      <Skeleton className="h-[500px] w-full clip-angle-lg" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 clip-angle" />
        ))}
      </div>
    </div>
    <div className="space-y-6">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="h-24 w-full" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-14 clip-angle" />
        ))}
      </div>
      <Skeleton className="h-14 w-full clip-angle" />
    </div>
  </div>
);

export const OrderRowSkeleton = () => (
  <div className="glass clip-angle p-5 border border-primary/20 space-y-3">
    <div className="flex justify-between">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-5 w-24" />
    </div>
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/3" />
  </div>
);

export const WishlistGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
