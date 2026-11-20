export interface ClientCompany {
  id: string;
  name: string;
  industry: "Pharmaceutical" | "Information Technology" | "Financial Services" | "Healthcare" | "Manufacturing";
  location: string;
  logoText: string;
  accentColor: string;
}

export const COMPANIES_SERVED: ClientCompany[] = [
  {
    id: "dr-reddys",
    name: "Dr. Reddy's Laboratories",
    industry: "Pharmaceutical",
    location: "Bollaram & Bachupally",
    logoText: "Dr.Reddy's",
    accentColor: "#673ab7",
  },
  {
    id: "aurobindo",
    name: "Aurobindo Pharma",
    industry: "Pharmaceutical",
    location: "HITEC City & Pashamylaram",
    logoText: "AUROBINDO",
    accentColor: "#0288d1",
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    industry: "Information Technology",
    location: "Synergy Park & Adibatla",
    logoText: "TCS",
    accentColor: "#0070ad",
  },
  {
    id: "infosys",
    name: "Infosys Limited",
    industry: "Information Technology",
    location: "Pocharam & Gachibowli",
    logoText: "Infosys",
    accentColor: "#007cc3",
  },
  {
    id: "hetero",
    name: "Hetero Drugs & Labs",
    industry: "Pharmaceutical",
    location: "Sanathnagar & Jeedimetla",
    logoText: "HETERO",
    accentColor: "#d32f2f",
  },
  {
    id: "wipro",
    name: "Wipro Technologies",
    industry: "Information Technology",
    location: "Gachibowli Financial District",
    logoText: "wipro",
    accentColor: "#388e3c",
  },
  {
    id: "divis",
    name: "Divi's Laboratories",
    industry: "Pharmaceutical",
    location: "Cyber Towers & Choutuppal",
    logoText: "Divi's",
    accentColor: "#1565c0",
  },
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    industry: "Information Technology",
    location: "Hitec City & Bahadurpally",
    logoText: "Tech Mahindra",
    accentColor: "#e53935",
  },
  {
    id: "biological-e",
    name: "Biological E. Limited",
    industry: "Pharmaceutical",
    location: "Genome Valley & Shamirpet",
    logoText: "Biological E.",
    accentColor: "#00897b",
  },
  {
    id: "amazon",
    name: "Amazon Development Centre",
    industry: "Information Technology",
    location: "Financial District, Nanakramguda",
    logoText: "amazon",
    accentColor: "#ff9900",
  },
  {
    id: "novartis",
    name: "Novartis Healthcare",
    industry: "Healthcare",
    location: "HITEC City Phase 2",
    logoText: "NOVARTIS",
    accentColor: "#004b87",
  },
  {
    id: "microsoft",
    name: "Microsoft India R&D",
    industry: "Information Technology",
    location: "Gachibowli Campus",
    logoText: "Microsoft",
    accentColor: "#00a4ef",
  },
  {
    id: "cyient",
    name: "Cyient Technologies",
    industry: "Information Technology",
    location: "Uppal & Manikonda",
    logoText: "CYIENT",
    accentColor: "#003b71",
  },
];
