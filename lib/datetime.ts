const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const relativeTimeFormat = new Intl.RelativeTimeFormat('en-US', {
  numeric: 'auto',
});

/**
 * Formats a date string into a human readable relative time
 * @param date The date string to format
 * @returns An object with the relative time and a boolean indicating if the date is fresh,
 * i.e. less than 4 days old
 */
export function getRelativeTime(date: string) {
  const timeDiff = new Date(date).getTime() - new Date().getTime();

  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  if (days > -14) {
    return {
      relativeTime: relativeTimeFormat.format(days, 'day'),
      isFresh: days > -4,
    };
  }

  const weeks = Math.floor(days / 7);
  if (weeks > -8) {
    return {
      relativeTime: relativeTimeFormat.format(weeks, 'week'),
      isFresh: false,
    };
  }

  const months = Math.floor(days / 30);
  return {
    relativeTime: relativeTimeFormat.format(months, 'month'),
    isFresh: false,
  };
}

/**
 * Formats a date string into a human readable format
 * @param date The date string to format
 * @returns An object with the formatted date, relative time and a boolean indicating if the date is fresh,
 * i.e. less than 4 days old
 */
export function parseDate(date: string) {
  const formattedDate = dateFormatter.format(new Date(date));
  const { relativeTime, isFresh } = getRelativeTime(date);

  return {
    formattedDate,
    relativeTime,
    isFresh,
  };
}
