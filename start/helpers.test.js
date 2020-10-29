const { is31DaysOrMoreApart } = require("./helpers.js");

describe("Unit tests for helper functions", () => {
  it("can determine if two dates are at least 31 days apart", async () => {
    const earlierDate = Date.parse("Mon Sep 20 2020 16:33:50 GMT-0400");
    const laterDate = Date.parse("Fri Oct 23 2020 16:33:50 GMT-0400");
    expect(is31DaysOrMoreApart(earlierDate, laterDate)).toBe(true);
  });
  it("can determine if two dates are not at least 31 days apart", async () => {
    const earlierDate = Date.parse("Sun Sep 27 2020 16:33:50 GMT-0400");
    const laterDate = Date.parse("Fri Oct 23 2020 16:33:50 GMT-0400");
    expect(is31DaysOrMoreApart(earlierDate, laterDate)).toBe(false);
  });
});
