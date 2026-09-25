function rupeesToMinor(rupees: number): number {
  return Math.round(rupees * 100);
}

function minorToRupees(minor: number): number {
  return minor / 100;
}

const iso = (date: string, time = "T09:00:00.000Z") => `${date}${time}`;

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  // Months are 0-indexed in JS (0 = January), so we add 1 and pad with a leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Returns e.g. "2026-09-25"
};

export { rupeesToMinor, minorToRupees, iso, getTodayDate };
