export function getCurrentAndPastDate() {
  const currentDate = new Date();

  // Clone current date and subtract 3 days
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 3);

  // Format dates to a readable format (YYYY-MM-DD)
  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    currentDate: formatDate(currentDate),
    pastDate: formatDate(pastDate),
  };
}
