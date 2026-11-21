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
    name: "Biocon Biologics",
    industry: "Pharmaceutical",
    location: "Electronic City & Hebbal",
    logoText: "Biocon",
    accentColor: "#673ab7",
  },
  {
    id: "aurobindo",
    name: "Syngene International",
    industry: "Pharmaceutical",
    location: "Bommasandra & Jigani",
    logoText: "SYNGENE",
    accentColor: "#0288d1",
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    industry: "Information Technology",
    location: "Koramangala & Whitefield",
    logoText: "TCS",
    accentColor: "#0070ad",
  },
  {
    id: "infosys",
    name: "Infosys Limited",
    industry: "Information Technology",
    location: "Electronic City & Outer Ring Road",
    logoText: "Infosys",
    accentColor: "#007cc3",
  },
  {
    id: "hetero",
    name: "Strides Pharma Science",
    industry: "Pharmaceutical",
    location: "Harohalli & Bommasandra",
    logoText: "STRIDES",
    accentColor: "#d32f2f",
  },
  {
    id: "wipro",
    name: "Wipro Technologies",
    industry: "Information Technology",
    location: "Whitefield & Sarjapur Road",
    logoText: "wipro",
    accentColor: "#388e3c",
  },
  {
    id: "divis",
    name: "Sun Pharmaceutical",
    industry: "Pharmaceutical",
    location: "Hosur Road & Electronic City",
    logoText: "SUN PHARMA",
    accentColor: "#1565c0",
  },
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    industry: "Information Technology",
    location: "Whitefield & HSR Layout",
    logoText: "Tech Mahindra",
    accentColor: "#e53935",
  },
  {
    id: "biological-e",
    name: "Biocon Limited",
    industry: "Pharmaceutical",
    location: "Electronic City Phase 1 & Begur",
    logoText: "Biocon",
    accentColor: "#00897b",
  },
  {
    id: "amazon",
    name: "Amazon Development Centre",
    industry: "Information Technology",
    location: "Koramangala & Whitefield",
    logoText: "amazon",
    accentColor: "#ff9900",
  },
  {
    id: "novartis",
    name: "Novartis Healthcare",
    industry: "Healthcare",
    location: "Indiranagar & Outer Ring Road",
    logoText: "NOVARTIS",
    accentColor: "#004b87",
  },
  {
    id: "microsoft",
    name: "Microsoft India R&D",
    industry: "Information Technology",
    location: "Hebbal & Whitefield",
    logoText: "Microsoft",
    accentColor: "#00a4ef",
  },
  {
    id: "cyient",
    name: "Cyient Technologies",
    industry: "Information Technology",
    location: "Koramangala & Jayanagar",
    logoText: "CYIENT",
    accentColor: "#003b71",
  },
];
