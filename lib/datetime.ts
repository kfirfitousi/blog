type DateTime = {
  /** The date formatted as a string
   * @example
   * 'January 1, 2022'
   * 'December 31, 2022'
   */
  asString: string;
  /** The date formatted as an ISO string
   * @example
   * '2022-01-01T00:00:00.000Z'
   */
  asISOString: string;
  /** The date formatted as a relative time string
   * @example
   * '2 days ago'
   * '3 weeks ago'
   */
  asRelativeTimeString: string;
  /** A boolean indicating if the date is fresh, i.e. less than 4 days old */
  isFresh: boolean;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-US', {
  numeric: 'auto',
});

/**
 * Formats a date string into a {@link DateTime} object.
 * @example
 * const dateTime = formatDateTime('2022-01-01');
 * // dateTime = {
 * //   asString: 'January 1, 2022',
 * //   asISOString: '2022-01-01T00:00:00.000Z',
 * //   asRelativeTimeString: '2 days ago',
 * //   isFresh: true
 * // }
 */
export function formatDateTime(dateString: string): DateTime {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return {
      asString: 'Invalid Date',
      asISOString: 'Invalid Date',
      asRelativeTimeString: 'Invalid Date',
      isFresh: false,
    };
  }

  const { relativeTime, isFresh } = getRelativeTime(date);

  return {
    asString: dateFormatter.format(date),
    asISOString: date.toISOString(),
    asRelativeTimeString: relativeTime,
    isFresh,
  };
}

/**
 * Formats a date into a relative time.
 * @returns The relative time string and a boolean indicating if the date is fresh,
 * i.e. less than 4 days old
 * @example
 * const { relativeTime, isFresh } = getRelativeTime(someDate);
 * // relativeTime = '3 weeks ago'
 * // isFresh = false
 */
function getRelativeTime(date: Date) {
  const timeDiff = date.getTime() - new Date().getTime();

  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  if (days > -14) {
    return {
      relativeTime: relativeTimeFormatter.format(days, 'day'),
      isFresh: days > -4,
    };
  }

  const weeks = Math.floor(days / 7);
  if (weeks > -8) {
    return {
      relativeTime: relativeTimeFormatter.format(weeks, 'week'),
      isFresh: false,
    };
  }

  const months = Math.floor(days / 30);
  if (months > -12) {
    return {
      relativeTime: relativeTimeFormatter.format(months, 'month'),
      isFresh: false,
    };
  }

  const years = Math.floor(days / 365);
  return {
    relativeTime: relativeTimeFormatter.format(years, 'year'),
    isFresh: false,
  };
}
