import { Skeleton } from "@/components/ui/skeleton";

export const ArticleCardsShell = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={index}>
      <Skeleton className="size-[350px] rounded-lg md:size-[400px] xl:size-[450px]" />
    </div>
  ));
};
