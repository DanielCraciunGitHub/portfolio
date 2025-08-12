/**
 * Formats project dates for display
 * @param startDate - The start date in YYYY-MM format or YYYY format
 * @param endDate - The end date in YYYY-MM format or YYYY format (optional)
 * @returns Formatted date string like "Jan 2023 - Present" or "2023 - 2024"
 */
export function formatProjectDates(
  startDate: string,
  endDate?: string
): string {
  const formatDate = (date: string): string => {
    // If it's just a year (YYYY)
    if (date.length === 4) {
      return date;
    }

    // If it's year-month (YYYY-MM)
    if (date.includes("-")) {
      const [year, month] = date.split("-");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIndex = parseInt(month || "1") - 1;
      return `${monthNames[monthIndex]} ${year}`;
    }

    return date;
  };

  const formattedStart = formatDate(startDate);
  const formattedEnd = endDate ? formatDate(endDate) : "Present";

  return `${formattedStart} - ${formattedEnd}`;
}
