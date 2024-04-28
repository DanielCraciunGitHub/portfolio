import { Skeleton } from "@/components/ui/skeleton"

export const ArticleCardsShell = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={index}>
      <Skeleton className="md:h-96 md:w-96 h-64 w-64" />
    </div>
  ))
}
