import { Skeleton } from "@/components/ui/skeleton"

export const ArticleCardsShell = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={index}>
      <Skeleton className="md:h-[250px] md:w-[300px] h-64 w-64" />
    </div>
  ))
}
