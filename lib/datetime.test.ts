import { formatDateTime } from './datetime';

describe('formatDateTime', () => {
  it('should format the date to a string', () => {
    const dateTime = formatDateTime('2022-01-01');
    expect(dateTime.asString).toBe('January 1, 2022');
  });

  it('should format the date to relative time', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateTime = formatDateTime(yesterday.toISOString());
    expect(dateTime.asRelativeTimeString).toBe('yesterday');

    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const threeWeeksAgoDateTime = formatDateTime(threeWeeksAgo.toISOString());
    expect(threeWeeksAgoDateTime.asRelativeTimeString).toBe('3 weeks ago');
  });

  it('should format the date to an ISO string', () => {
    const dateTime = formatDateTime('2022-01-01');
    expect(dateTime.asISOString).toBe('2022-01-01T00:00:00.000Z');
  });

  it('should return whether date is fresh', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateTime = formatDateTime(yesterday.toISOString());
    expect(dateTime.isFresh).toBe(true);

    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    const fourDaysAgoDateTime = formatDateTime(fourDaysAgo.toISOString());
    expect(fourDaysAgoDateTime.isFresh).toBe(false);

    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const threeWeeksAgoDateTime = formatDateTime(threeWeeksAgo.toISOString());
    expect(threeWeeksAgoDateTime.isFresh).toBe(false);
  });
});
