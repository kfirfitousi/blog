const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function relativeTime(date: string) {
  const timeDiff = new Date(date).getTime() - new Date().getTime();

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  if (days > -14) {
    return rtf.format(days, "day");
  }

  const weeks = Math.floor(days / 7);
  if (weeks > -8) {
    return rtf.format(weeks, "week");
  }

  const months = Math.floor(days / 30);
  return rtf.format(months, "month");
}

export function isFresh(date: string) {
  const timeDiff = new Date(date).getTime() - new Date().getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  return days > -4;
}
