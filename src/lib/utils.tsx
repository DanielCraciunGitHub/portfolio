import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-GB";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function nameToPath(name: string): string {
  return `/${name.toLowerCase().replaceAll(" ", "_")}`;
}

export function pathToName(path: string | undefined): string | undefined {
  const cleanedPath = path?.replace(/^\//, "");

  const nameWithSpaces = cleanedPath?.replace(/_/g, " ");

  const words = nameWithSpaces?.split(" ");
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  return capitalizedWords?.join(" ");
}

export function getInitials(name?: string | null): string | undefined {
  // Split the name into words
  const words = name?.trim().split(/\s+/);

  // Get the first letter of each word and capitalize it
  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials;
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}
export function sqliteTimestampNow(): string {
  // Get the current date
  const currentDate = new Date();

  // Format the date as "YYYY-MM-DD HH:MM:SS"
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return formattedDate;
}
export function articleSlugToTitle(slug: string): string {
  // Split the slug by hyphens
  const words = slug.split("-");

  // Capitalize the first letter of each word
  const titleWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  // Join the title words with spaces
  const title = titleWords.join(" ");

  return title;
}

export function formatArticleViews(views: number): string {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`;
  } else {
    return String(views);
  }
}

// Format:

// This is a nice image: https://...

// Parsed:

// This is a nice image: <source> <-- this is a link

// Cases:
/*
1. empty caption = check outside the function
2. caption with one word = ok, not a source.
3. caption with link anywhere but the end = could handle this by extracting
    words individually and checking for https://
*/

// omit case 3, because this will require use of dangerous html
export function CaptionSource({ caption }: { caption: string | undefined }) {
  if (caption) {
    const words = caption.split(" ");
    const source = words[words.length - 1];

    const captionWithoutSource = caption.replace(source, "");

    return source.startsWith("https://") ? (
      <figcaption className="block text-sm leading-8 tracking-tight text-muted-foreground sm:text-base">
        {captionWithoutSource}
        {source ? (
          <Link
            className="text-blue-500"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"<source>"}
          </Link>
        ) : null}
      </figcaption>
    ) : (
      <figcaption className="block text-sm leading-8 tracking-tight text-muted-foreground sm:text-base">
        {caption}
      </figcaption>
    );
  } else {
    return null;
  }
}
