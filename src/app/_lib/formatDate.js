export default function formatDate(inputDate) {
  const options = { year: "numeric", month: "long" };
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Extract the day and add the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const day = date.getDate();
  const dayWithSuffix =
    day +
    (day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th");

  const dateObject = {
    day: dayWithSuffix,
    month: formattedDate.split(" ")[0],
    year: formattedDate.split(" ")[1],
  };
  // Construct the final formatted date
  return dayWithSuffix + "  " + dateObject.month + ",  " + dateObject.year;
}
