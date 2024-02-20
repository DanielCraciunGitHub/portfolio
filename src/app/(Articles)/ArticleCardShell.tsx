import { Skeleton } from "@/components/ui/skeleton"

export const ArticleCardsShell = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={index} className="w-2/3">
      <Skeleton className="h-[250px] w-[300px]" />
    </div>
  ))
}
