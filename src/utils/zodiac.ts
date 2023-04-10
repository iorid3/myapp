export const getZodiacSign = (birthday:string) => {
    const [year, month, day] = birthday.split("-").map(Number);
  
    const zodiacSigns = [
      "Capricorn",
      "Aquarius",
      "Pisces",
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
    ];
  
    const lastDayOfSign = [
      20, // Capricorn
      19, // Aquarius
      20, // Pisces
      20, // Aries
      20, // Taurus
      21, // Gemini
      22, // Cancer
      22, // Leo
      22, // Virgo
      22, // Libra
      21, // Scorpio
      21, // Sagittarius
    ];
  
    const signIndex = month - (day < lastDayOfSign[month - 1] ? 1 : 0);
  
    return zodiacSigns[signIndex % 12]

}