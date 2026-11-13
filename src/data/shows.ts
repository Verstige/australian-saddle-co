export type Show = {
  name: string;
  dates: string;
  location: string;
  address: string;
  booth: string;
  website: string;
  websiteLabel: string;
  note?: string;
};

/**
 * Upcoming show schedule, transcribed from australiansaddleco.com/pages/upcoming-shows
 */
export const shows: Show[] = [
  {
    name: "Cheyenne Frontier Days",
    dates: "July 21–27, 2025",
    location: "Cheyenne Frontier Days Arena",
    address: "4501 Carey Ave., Cheyenne, WY 82001",
    booth: "Midway",
    website: "https://www.cfdrodeo.com/",
    websiteLabel: "cfdrodeo.com",
  },
  {
    name: "American Quarter Horse Congress",
    dates: "September 27 – October 26, 2025",
    location: "Ohio Expo Center — Congress Marketplace",
    address: "717 E. 17th Ave., Columbus, OH 43211",
    booth: "Booth #N",
    website: "https://www.quarterhorsecongress.com/",
    websiteLabel: "quarterhorsecongress.com",
  },
  {
    name: "Equine Affaire",
    dates: "November 6–9, 2025",
    location: "Eastern States Exposition — Better Living Center",
    address: "1305 Memorial Ave., West Springfield, MA 01089",
    booth: "Booths 1008–1011",
    website: "https://equineaffaire.com/",
    websiteLabel: "equineaffaire.com",
  },
  {
    name: "Cowboy Christmas",
    dates: "December 4–13, 2025",
    location: "Las Vegas Convention Center",
    address: "Las Vegas, NV 89109",
    booth: "Booth #320",
    website: "https://www.nfrexperience.com/",
    websiteLabel: "nfrexperience.com",
  },
  {
    name: "Equifest of Kansas",
    dates: "January 23–25, 2026",
    location: "Saline County Livestock Expo Center",
    address: "900 Greeley Ave., Salina, KS 67401",
    booth: "Booth TBA",
    website: "https://www.equifestofks.com/",
    websiteLabel: "equifestofks.com",
  },
  {
    name: "Southern Equine Expo",
    dates: "February 20–22, 2026",
    location: "Tennessee Miller Coliseum",
    address: "304 W. Thompson Ln., Murfreesboro, TN 37129",
    booth: "Booth #41",
    website: "https://www.southernequineexpo.com/",
    websiteLabel: "southernequineexpo.com",
  },
  {
    name: "PA Horse World Expo",
    dates: "March 5–8, 2026",
    location: "PA Farm Show Complex",
    address: "2301 N. Cameron St., Harrisburg, PA 17110",
    booth: "Booths 229–231",
    website: "https://www.horseworldexpo.com/",
    websiteLabel: "horseworldexpo.com",
  },
  {
    name: "Equine Affaire Ohio",
    dates: "April 9–12, 2026",
    location: "Ohio Expo Center",
    address: "717 E. 17th Ave., Columbus, OH 43211",
    booth: "Booths 334–337",
    website: "https://equineaffaire.com/",
    websiteLabel: "equineaffaire.com",
  },
  {
    name: "Minnesota Horse Expo",
    dates: "April 24–26, 2026",
    location: "Minnesota Horse Expo",
    address: "TBA",
    booth: "TBA",
    website: "https://www.mnhorseexpo.org/",
    websiteLabel: "mnhorseexpo.org",
  },
];
