export interface Driver {
  id: string;
  name: string;
  number: number;
  team: string;
  nationality: string;
  flagCode: string;
  dateOfBirth: string;
  placeOfBirth: string;
  championships: number;
  raceWins: number;
  podiums: number;
  polePositions: number;
  fastestLaps: number;
  points: number;
  position: number;
  photo: string;
  biography: string;
  careerStats: {
    grandsPrixEntered: number;
    highestRaceFinish: string;
    highestGridPosition: number;
  };
}

export const drivers: Driver[] = [
  // --- MCLAREN ---
  {
    id: "lando-norris",
    name: "Lando Norris",
    number: 4,
    team: "mclaren",
    nationality: "British",
    flagCode: "GB",
    dateOfBirth: "1999-11-13",
    placeOfBirth: "Bristol, England",
    championships: 1,
    raceWins: 10,
    podiums: 42,
    polePositions: 15,
    fastestLaps: 16,
    points: 432,
    position: 1,
    photo: "/F1-Club/drivers/norris.jpg", // ADDED /F1-Club
    biography: "In a season for the ages, Lando Norris secured 7 victories and the World Championship, edging out his teammate in a dominant year for McLaren.",
    careerStats: {
      grandsPrixEntered: 147,
      highestRaceFinish: "1st (x10)",
      highestGridPosition: 1,
    },
  },
  {
    id: "oscar-piastri",
    name: "Oscar Piastri",
    number: 81,
    team: "mclaren",
    nationality: "Australian",
    flagCode: "AU",
    dateOfBirth: "2001-04-06",
    placeOfBirth: "Melbourne, Australia",
    championships: 0,
    raceWins: 9,
    podiums: 26,
    polePositions: 6,
    fastestLaps: 9,
    points: 425,
    position: 2,
    photo: "/F1-Club/drivers/piastri.jpg", // ADDED /F1-Club
    biography: "Matching his teammate with 7 victories, Oscar Piastri proved himself a generational talent, fighting for the title down to the very last lap.",
    careerStats: {
      grandsPrixEntered: 65,
      highestRaceFinish: "1st (x9)",
      highestGridPosition: 1,
    },
  },

  // --- RED BULL RACING ---
  {
    id: "max-verstappen",
    name: "Max Verstappen",
    number: 1,
    team: "red-bull",
    nationality: "Dutch",
    flagCode: "NL",
    dateOfBirth: "1997-09-30",
    placeOfBirth: "Hasselt, Belgium",
    championships: 4,
    raceWins: 69,
    podiums: 128,
    polePositions: 48,
    fastestLaps: 38,
    points: 390,
    position: 3,
    photo: "/F1-Club/drivers/verstappen.jpg", // ADDED /F1-Club
    biography: "Despite a valiant effort and 6 victories, Verstappen couldn't hold off the McLaren surge, finishing a respectable third in the standings.",
    careerStats: {
      grandsPrixEntered: 228,
      highestRaceFinish: "1st (x69)",
      highestGridPosition: 1,
    },
  },
  {
    id: "liam-lawson",
    name: "Liam Lawson",
    number: 30,
    team: "red-bull",
    nationality: "New Zealander",
    flagCode: "NZ",
    dateOfBirth: "2002-02-11",
    placeOfBirth: "Hastings, New Zealand",
    championships: 0,
    raceWins: 0,
    podiums: 2,
    polePositions: 0,
    fastestLaps: 1,
    points: 115,
    position: 8,
    photo: "/F1-Club/drivers/lawson.jpg", // ADDED /F1-Club
    biography: "A solid first full season for the Kiwi, securing consistent points and his first podiums to help Red Bull secure second in the Constructors'.",
    careerStats: {
      grandsPrixEntered: 33,
      highestRaceFinish: "3rd (x2)",
      highestGridPosition: 4,
    },
  },

  // --- MERCEDES ---
  {
    id: "george-russell",
    name: "George Russell",
    number: 63,
    team: "mercedes",
    nationality: "British",
    flagCode: "GB",
    dateOfBirth: "1998-02-15",
    placeOfBirth: "King's Lynn, England",
    championships: 0,
    raceWins: 4,
    podiums: 22,
    polePositions: 6,
    fastestLaps: 10,
    points: 245,
    position: 4,
    photo: "/F1-Club/drivers/russell.jpg", // ADDED /F1-Club
    biography: "Russell led Mercedes admirably with victories in Canada and Singapore, establishing himself as the clear team leader.",
    careerStats: {
      grandsPrixEntered: 147,
      highestRaceFinish: "1st (x4)",
      highestGridPosition: 1,
    },
  },
  {
    id: "kimi-antonelli",
    name: "Andrea Kimi Antonelli",
    number: 12,
    team: "mercedes",
    nationality: "Italian",
    flagCode: "IT",
    dateOfBirth: "2006-08-25",
    placeOfBirth: "Bologna, Italy",
    championships: 0,
    raceWins: 0,
    podiums: 1,
    polePositions: 0,
    fastestLaps: 0,
    points: 55,
    position: 12,
    photo: "/F1-Club/drivers/antonelli.jpg", // ADDED /F1-Club
    biography: "The rookie showed flashes of brilliance and raw speed, learning the ropes alongside Russell in a high-pressure environment.",
    careerStats: {
      grandsPrixEntered: 22,
      highestRaceFinish: "3rd (x1)",
      highestGridPosition: 5,
    },
  },

  // --- FERRARI ---
  {
    id: "charles-leclerc",
    name: "Charles Leclerc",
    number: 16,
    team: "ferrari",
    nationality: "Monégasque",
    flagCode: "MC",
    dateOfBirth: "1997-10-16",
    placeOfBirth: "Monte Carlo, Monaco",
    championships: 0,
    raceWins: 8,
    podiums: 50,
    polePositions: 30,
    fastestLaps: 12,
    points: 210,
    position: 5,
    photo: "/F1-Club/drivers/leclerc.jpg", // ADDED /F1-Club
    biography: "A frustrating winless season for Leclerc, though he remained consistent to finish top-five in the standings ahead of his new teammate.",
    careerStats: {
      grandsPrixEntered: 168,
      highestRaceFinish: "1st (x8)",
      highestGridPosition: 1,
    },
  },
  {
    id: "lewis-hamilton",
    name: "Lewis Hamilton",
    number: 44,
    team: "ferrari",
    nationality: "British",
    flagCode: "GB",
    dateOfBirth: "1985-01-07",
    placeOfBirth: "Stevenage, England",
    championships: 7,
    raceWins: 105,
    podiums: 206,
    polePositions: 105,
    fastestLaps: 69,
    points: 195,
    position: 6,
    photo: "/F1-Club/drivers/hamilton.jpg", // ADDED /F1-Club
    biography: "Hamilton's debut season in red was one of adaptation. While winless, his experience helped Ferrari gather crucial data for 2026.",
    careerStats: {
      grandsPrixEntered: 375,
      highestRaceFinish: "1st (x105)",
      highestGridPosition: 1,
    },
  },

  // --- WILLIAMS ---
  {
    id: "carlos-sainz",
    name: "Carlos Sainz",
    number: 55,
    team: "williams",
    nationality: "Spanish",
    flagCode: "ES",
    dateOfBirth: "1994-09-01",
    placeOfBirth: "Madrid, Spain",
    championships: 0,
    raceWins: 4,
    podiums: 26,
    polePositions: 6,
    fastestLaps: 4,
    points: 105,
    position: 7,
    photo: "/F1-Club/drivers/sainz.jpg", // ADDED /F1-Club
    biography: "Sainz was the standout performer of the midfield, dragging the Williams to a surprise podium and consistently scoring points.",
    careerStats: {
      grandsPrixEntered: 228,
      highestRaceFinish: "1st (x4)",
      highestGridPosition: 1,
    },
  },
  {
    id: "alexander-albon",
    name: "Alexander Albon",
    number: 23,
    team: "williams",
    nationality: "Thai",
    flagCode: "TH",
    dateOfBirth: "1996-03-23",
    placeOfBirth: "London, England",
    championships: 0,
    raceWins: 0,
    podiums: 2,
    polePositions: 0,
    fastestLaps: 0,
    points: 58,
    position: 11,
    photo: "/F1-Club/drivers/albon.jpg", // ADDED /F1-Club
    biography: "Forming a potent partnership with Sainz, Albon helped Williams secure 5th in the Constructors' Championship.",
    careerStats: {
      grandsPrixEntered: 126,
      highestRaceFinish: "3rd (x2)",
      highestGridPosition: 4,
    },
  },

  // --- ASTON MARTIN ---
  {
    id: "fernando-alonso",
    name: "Fernando Alonso",
    number: 14,
    team: "aston-martin",
    nationality: "Spanish",
    flagCode: "ES",
    dateOfBirth: "1981-07-29",
    placeOfBirth: "Oviedo, Spain",
    championships: 2,
    raceWins: 32,
    podiums: 108,
    polePositions: 22,
    fastestLaps: 27,
    points: 92,
    position: 9,
    photo: "/F1-Club/drivers/alonso.jpg", // ADDED /F1-Club
    biography: "The veteran fought hard in the midfield, squeezing every ounce of performance from the AMR25 to finish inside the top 10.",
    careerStats: {
      grandsPrixEntered: 421,
      highestRaceFinish: "1st (x32)",
      highestGridPosition: 1,
    },
  },
  {
    id: "lance-stroll",
    name: "Lance Stroll",
    number: 18,
    team: "aston-martin",
    nationality: "Canadian",
    flagCode: "CA",
    dateOfBirth: "1998-10-29",
    placeOfBirth: "Montreal, Canada",
    championships: 0,
    raceWins: 0,
    podiums: 3,
    polePositions: 1,
    fastestLaps: 0,
    points: 28,
    position: 14,
    photo: "/F1-Club/drivers/stroll.jpg", // ADDED /F1-Club
    biography: "A difficult season for Stroll, struggling to match his teammate's consistency in a tightly contested midfield battle.",
    careerStats: {
      grandsPrixEntered: 188,
      highestRaceFinish: "3rd (x3)",
      highestGridPosition: 1,
    },
  },

  // --- ALPINE ---
  {
    id: "pierre-gasly",
    name: "Pierre Gasly",
    number: 10,
    team: "alpine",
    nationality: "French",
    flagCode: "FR",
    dateOfBirth: "1996-02-07",
    placeOfBirth: "Rouen, France",
    championships: 0,
    raceWins: 1,
    podiums: 5,
    polePositions: 0,
    fastestLaps: 3,
    points: 60,
    position: 10,
    photo: "/F1-Club/drivers/gasly.jpg", // ADDED /F1-Club
    biography: "Gasly outperformed the car for much of the season, leading Alpine's efforts with several impressive Q3 appearances.",
    careerStats: {
      grandsPrixEntered: 175,
      highestRaceFinish: "1st (x1)",
      highestGridPosition: 2,
    },
  },
  {
    id: "jack-doohan",
    name: "Jack Doohan",
    number: 7,
    team: "alpine",
    nationality: "Australian",
    flagCode: "AU",
    dateOfBirth: "2003-01-20",
    placeOfBirth: "Gold Coast, Australia",
    championships: 0,
    raceWins: 0,
    podiums: 0,
    polePositions: 0,
    fastestLaps: 0,
    points: 12,
    position: 18,
    photo: "/F1-Club/drivers/doohan.jpg", // ADDED /F1-Club
    biography: "A learning year for the Australian rookie, showing improved pace in the second half of the season.",
    careerStats: {
      grandsPrixEntered: 22,
      highestRaceFinish: "9th (x1)",
      highestGridPosition: 11,
    },
  },

  // --- RACING BULLS (RB) ---
  {
    id: "yuki-tsunoda",
    name: "Yuki Tsunoda",
    number: 22,
    team: "rb",
    nationality: "Japanese",
    flagCode: "JP",
    dateOfBirth: "2000-05-11",
    placeOfBirth: "Sagamihara, Japan",
    championships: 0,
    raceWins: 0,
    podiums: 0,
    polePositions: 0,
    fastestLaps: 2,
    points: 45,
    position: 13,
    photo: "/F1-Club/drivers/tsunoda.jpg", // ADDED /F1-Club
    biography: "Tsunoda continued to be the rock for RB, scoring the majority of the team's points with aggressive drives.",
    careerStats: {
      grandsPrixEntered: 109,
      highestRaceFinish: "4th (x1)",
      highestGridPosition: 6,
    },
  },
  {
    id: "isack-hadjar",
    name: "Isack Hadjar",
    number: 6,
    team: "rb",
    nationality: "French",
    flagCode: "FR",
    dateOfBirth: "2004-09-28",
    placeOfBirth: "Paris, France",
    championships: 0,
    raceWins: 0,
    podiums: 0,
    polePositions: 0,
    fastestLaps: 0,
    points: 6,
    position: 19,
    photo: "/F1-Club/drivers/hadjar.jpg", // ADDED /F1-Club
    biography: "Hadjar had a fiery debut season, showing raw speed but suffering from rookie errors and reliability issues.",
    careerStats: {
      grandsPrixEntered: 22,
      highestRaceFinish: "10th (x2)",
      highestGridPosition: 9,
    },
  },

  // --- SAUBER ---
  {
    id: "nico-hulkenberg",
    name: "Nico Hülkenberg",
    number: 27,
    team: "sauber",
    nationality: "German",
    flagCode: "DE",
    dateOfBirth: "1987-08-19",
    placeOfBirth: "Emmerich, Germany",
    championships: 0,
    raceWins: 0,
    podiums: 0,
    polePositions: 1,
    fastestLaps: 2,
    points: 22,
    position: 15,
    photo: "/F1-Club/drivers/hulkenberg.jpg", // ADDED /F1-Club
    biography: "Hülkenberg provided the stability Sauber needed, regularly qualifying well even if race pace was lacking.",
    careerStats: {
      grandsPrixEntered: 249,
      highestRaceFinish: "4th (x3)",
      highestGridPosition: 1,
    },
  },
  {
    id: "gabriel-bortoleto",
    name: "Gabriel Bortoleto",
    number: 5,
    team: "sauber",
    nationality: "Brazilian",
    flagCode: "BR",
    dateOfBirth: "2004-10-14",
    placeOfBirth: "São Paulo, Brazil",
    championships: 0,
    raceWins: 0,
    podiums: 0,
    polePositions: 0,
    fastestLaps: 0,
    points: 4,
    position: 20,
    photo: "/F1-Club/drivers/bortoleto.jpg", // ADDED /F1-Club
    biography: "The young Brazilian found the jump to F1 challenging in a difficult car but managed to score his first points in Brazil.",
    careerStats: {
      grandsPrixEntered: 22,
      highestRaceFinish: "9th (x1)",
      highestGridPosition: 12,
    },
  },

  // --- HAAS ---
  {
    id: "esteban-ocon",
    name: "Esteban Ocon",
    number: 31,
    team: "haas",
    nationality: "French",
    flagCode: "FR",
    dateOfBirth: "1996-09-17",
    placeOfBirth: "Évreux, France",
    championships: 0,
    raceWins: 1,
    podiums: 3,
    polePositions: 0,
    fastestLaps: 0,
    points: 18,
    position: 16,
    photo: "/F1-Club/drivers/ocon.jpg", // ADDED /F1-Club
    biography: "Ocon's move to Haas brought grit to the team, fighting for the final points positions in a very competitive field.",
    careerStats: {
      grandsPrixEntered: 175,
      highestRaceFinish: "1st (x1)",
      highestGridPosition: 3,
    },
  },
  {
    id: "oliver-bearman",
    name: "Oliver Bearman",
    number: 87,
    team: "haas",
    nationality: "British",
    flagCode: "GB",
    dateOfBirth: "2005-05-08",
    placeOfBirth: "Chelmsford, England",
    championships: 0,
    raceWins: 0,
    podiums: 0,
    polePositions: 0,
    fastestLaps: 0,
    points: 15,
    position: 17,
    photo: "/F1-Club/drivers/bearman.jpg", // ADDED /F1-Club
    biography: "Bearman impressed in his full rookie season, nearly matching his experienced teammate on points.",
    careerStats: {
      grandsPrixEntered: 25,
      highestRaceFinish: "7th (x1)",
      highestGridPosition: 8,
    },
  },
];
