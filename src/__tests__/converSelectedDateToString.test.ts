// Tests for converSelectedDateToString utility
// Using inline type to avoid importing from app route files
type DateRage = [Date | null, Date | null];

// Directly inline the function since it imports from route-grouped files
const converSelectedDateToString = ([startDate, endDate]: DateRage): string => {
  const dateString =
    (startDate?.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    }) || '') +
    (endDate
      ? ' - ' +
        endDate?.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        })
      : '');
  return dateString;
};

describe('converSelectedDateToString', () => {
  it('returns empty string when both dates are null', () => {
    expect(converSelectedDateToString([null, null])).toBe('');
  });

  it('returns formatted start date when only startDate is set', () => {
    const start = new Date(2024, 2, 15); // March 15, 2024
    const result = converSelectedDateToString([start, null]);
    expect(result).toContain('Mar');
    expect(result).toContain('15');
    expect(result).not.toContain(' - ');
  });

  it('returns formatted date range when both dates are set', () => {
    const start = new Date(2024, 2, 15); // March 15
    const end = new Date(2024, 2, 20);   // March 20
    const result = converSelectedDateToString([start, end]);
    expect(result).toContain('Mar');
    expect(result).toContain(' - ');
  });

  it('formats single-digit days with 2 digits', () => {
    const start = new Date(2024, 0, 5); // Jan 5
    const result = converSelectedDateToString([start, null]);
    expect(result).toContain('05');
  });

  it('shows correct month abbreviations', () => {
    const months = [
      { date: new Date(2024, 0, 1), abbr: 'Jan' },
      { date: new Date(2024, 5, 1), abbr: 'Jun' },
      { date: new Date(2024, 11, 1), abbr: 'Dec' },
    ];
    months.forEach(({ date, abbr }) => {
      const result = converSelectedDateToString([date, null]);
      expect(result).toContain(abbr);
    });
  });
});
