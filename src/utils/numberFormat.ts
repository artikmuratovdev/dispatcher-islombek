/**
 * Format number with space as thousands separator
 * Example: 1000000 -> "1 000 000"
 */
export const formatNumber = (
  value: number | string | null | undefined,
): string => {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) {
    return "0";
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/**
 * Parse formatted number string to number
 * Example: "1 000 000" -> 1000000
 */
export const parseFormattedNumber = (value: string): number => {
  if (!value) return 0;

  const cleaned = value.replace(/\s/g, "");
  const num = parseFloat(cleaned);

  return isNaN(num) ? 0 : num;
};

/**
 * Format number input value (handles both formatted and unformatted input)
 */
export const formatInputValue = (value: string | number): string => {
  if (!value && value !== 0) return "";

  const str = String(value).replace(/\s/g, "");
  const num = parseFloat(str);

  if (isNaN(num)) return "";

  return formatNumber(num);
};
