const today = new Date();
const dayName: string = today.toLocaleDateString("en-US", { weekday: "long" });
const day: number = today.getDate();
const month: string = today.toLocaleDateString("en-US", { month: "long" });
const year: number = today.getFullYear();

const banglaDays: { [key: string]: string } = {
  "Sunday": "রবিবার",
  "Monday": "সোমবার",
  "Tuesday": "মঙ্গলবার",
  "Wednesday": "বুধবার",
  "Thursday": "বৃহস্পতিবার",
  "Friday": "শুক্রবার",
  "Saturday": "শনিবার"
};

const banglaMonths: { [key: string]: string } = {
  "January": "জানুয়ারি",
  "February": "ফেব্রুয়ারি",
  "March": "মার্চ",
  "April": "এপ্রিল",
  "May": "মে",
  "June": "জুন",
  "July": "জুলাই",
  "August": "আগস্ট",
  "September": "সেপ্টেম্বর",
  "October": "অক্টোবর",
  "November": "নভেম্বর",
  "December": "ডিসেম্বর"
};

const convertToBanglaDigits = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(digit => banglaDigits[parseInt(digit)]).join('');
};

const banglaDayName: string | undefined = banglaDays[dayName];
const banglaMonth: string | undefined = banglaMonths[month];
const banglaDay: string = convertToBanglaDigits(day);
const banglaYear: string = convertToBanglaDigits(year);


if (!banglaDayName || !banglaMonth) {
  throw new Error("Day name or month is undefined");
}

export const formattedBanglaDate: string = `${banglaDayName}, ${banglaDay} ${banglaMonth} ${banglaYear}`;

