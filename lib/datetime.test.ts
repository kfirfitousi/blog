import { describe, expect, it } from 'vitest';

import { formatDateTime } from './datetime';

describe('formatDateTime', () => {
  it('formats the date to a string', () => {
    expect(formatDateTime('2022-01-01').asString).toBe('January 1, 2022');
  });

  it('formats the date to relative time', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatDateTime(yesterday.toISOString()).asRelativeTimeString).toBe(
      'yesterday',
    );

    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    expect(
      formatDateTime(threeWeeksAgo.toISOString()).asRelativeTimeString,
    ).toBe('3 weeks ago');
  });

  it('format the date to an ISO string', () => {
    let dateTime = formatDateTime('2022-01-01');
    expect(dateTime.asISOString).toBe('2022-01-01T00:00:00.000Z');

    expect(formatDateTime('2022-12-31').asISOString).toBe(
      '2022-12-31T00:00:00.000Z',
    );
  });

  it('should return whether date is fresh', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatDateTime(yesterday.toISOString()).isFresh).toBe(true);

    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    expect(formatDateTime(fourDaysAgo.toISOString()).isFresh).toBe(false);

    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    expect(formatDateTime(threeWeeksAgo.toISOString()).isFresh).toBe(false);
  });

  it('should handle invalid date strings', () => {
    const invalidDateResult = {
      asString: 'Invalid Date',
      asISOString: 'Invalid Date',
      asRelativeTimeString: 'Invalid Date',
      isFresh: false,
    };

    expect(formatDateTime('2022-13-01')).toEqual(invalidDateResult);
    expect(formatDateTime('foo')).toEqual(invalidDateResult);
    expect(formatDateTime('')).toEqual(invalidDateResult);
  });
});
