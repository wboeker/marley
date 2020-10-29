// Assuming all months are 31 days
function is31DaysOrMoreApart(earlierDate, laterDate) {
  const millisecondsInMonth = 31 * 24 * 60 * 60 * 1000;
  const oneMonthAfterEarlierDate = earlierDate + millisecondsInMonth;
  return laterDate > oneMonthAfterEarlierDate;
}

module.exports = {
  is31DaysOrMoreApart,
};
