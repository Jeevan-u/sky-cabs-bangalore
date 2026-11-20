// jest setup — use matchers-only entry that has no @testing-library/dom peer requirement
const matchers = require('@testing-library/jest-dom/matchers');
if (typeof expect !== 'undefined' && expect.extend) {
  expect.extend(matchers);
}
