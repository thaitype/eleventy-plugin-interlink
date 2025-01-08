export function logger(message: string) {
  console.log(message);
}

export function getDateTimeSlug() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Combine the components into a slug pattern
  const slugDateTime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
  return slugDateTime;
}
