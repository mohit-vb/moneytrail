function rupeesToMinor(rupees: number): number {
  return Math.round(rupees * 100);
}

/** Converts integer paise back to a rupee number (for display formatting only). */
function minorToRupees(minor: number): number {
  return minor / 100;
}

const iso = (date: string, time = "T09:00:00.000Z") => `${date}${time}`;

export { rupeesToMinor, minorToRupees, iso };
