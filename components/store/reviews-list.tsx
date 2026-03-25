import { Star } from "lucide-react";
import type { ProductReview } from "@/types/domain";
import { Card, CardContent } from "@/components/ui/card";

export function ReviewsList({ reviews }: { reviews: ProductReview[] }) {
  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-white/80">
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{review.title}</p>
                <p className="text-sm text-muted">{review.author_name}</p>
              </div>
              <div className="flex items-center gap-1 text-warning">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-sm leading-7 text-muted">{review.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

