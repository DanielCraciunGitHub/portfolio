import { Skeleton } from "@/components/ui/skeleton"

export const ArticleCardsShell = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-24">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-[250px] w-[300px]" />
      ))}
    </div>
  )
}
