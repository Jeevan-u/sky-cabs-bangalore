/**
 * Safely format any pickup date/time representation into a human-friendly Indian locale string.
 * Supports ISO strings, "YYYY-MM-DD at HH:MM AM/PM", and raw text without throwing or displaying "Invalid Date".
 */
export function formatPickupDateTime(val?: string | null): string {
  if (!val || !val.trim()) return "Schedule confirmed / Immediate pickup";

  // Try standard Date parsing first
  const d = new Date(val);
  if (!isNaN(d.getTime())) {
    return d.toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
    });
  }

  // Handle "YYYY-MM-DD at HH:MM AM/PM" or similar formats
  if (val.includes(" at ")) {
    const [dPart, tPart] = val.split(" at ");
    try {
      const match = tPart?.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const mins = match[2];
        const ampm = (match[3] || "").toUpperCase();
        if (ampm === "PM" && hours < 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;
        const iso = `${dPart.trim()}T${hours.toString().padStart(2, "0")}:${mins}:00`;
        const testD = new Date(iso);
        if (!isNaN(testD.getTime())) {
          return testD.toLocaleString("en-IN", {
            dateStyle: "full",
            timeStyle: "short",
          });
        }
      }
    } catch {
      // ignore
    }
    // Return original readable string rather than "Invalid Date"
    return val;
  }

  return val;
}
