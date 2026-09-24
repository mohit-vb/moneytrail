function rupeesToMinor(rupees: number): number {
  return Math.round(rupees * 100);
}

function minorToRupees(minor: number): number {
  return minor / 100;
}

const iso = (date: string, time = "T09:00:00.000Z") => `${date}${time}`;

export { rupeesToMinor, minorToRupees, iso };
