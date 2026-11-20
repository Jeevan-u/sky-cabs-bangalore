export interface CorporateServicePillar {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  icon: string;
  features: string[];
  metrics: { label: string; value: string }[];
  ctaText: string;
  image: string;
}

export const CORPORATE_SERVICES: CorporateServicePillar[] = [
  {
    id: "pharma-transport",
    title: "Pharma Employees Transport",
    subtitle: "24x7 Continuous Shift Transit for Hyderabad Industrial Belts",
    tag: "Pharmaceutical & Manufacturing Corridors",
    description:
      "Reliable, punctual, round-the-clock shift-based employee transport solutions engineered for Hyderabad's pharmaceutical majors across Genome Valley, Bollaram, Jeedimetla, Pashamylaram, and Sanathnagar. Zero-delay roster compliance with sanitized AC buses and cabs.",
    icon: "BeakerIcon",
    features: [
      "24x7 rotational shift pickups (Morning, General, Evening & Night shifts)",
      "Strict compliance with industrial factory safety standards & GPS geo-fencing",
      "Dedicated backup vehicles stationed at major junction hubs for zero downtime",
      "Route optimization for employee residential clusters across Kukatpally, KPHB & Miyapur",
    ],
    metrics: [
      { label: "Punctuality Rate", value: "99.4%" },
      { label: "Shift Coverage", value: "24x7x365" },
      { label: "Industrial Hubs", value: "8+ Corridors" },
    ],
    ctaText: "Request Pharma Commute Proposal",
    image: "/images/corporate/pharma-commute.jpg",
  },
  {
    id: "it-transport",
    title: "IT & Tech Shuttles",
    subtitle: "Premium Daily Executive Commute for Tech Corridors",
    tag: "HITEC City & Financial District",
    description:
      "Comfortable, high-occupancy corporate employee shuttles, dedicated cabs, and executive vans connecting Cyber Towers, Mindspace, Waverock, DLF Cyber City, and Knowledge City. Fastag equipped, sanitized, and chauffeur verified.",
    icon: "BuildingOffice2Icon",
    features: [
      "Custom point-to-point and nodal pickup routing with real-time roster sync",
      "Executive Force Urbania, Tempo Travellers & 32-50 seater luxury AC coaches",
      "Automated digital trip sheets with odometer & GPS tracking for seamless audits",
      "Corporate monthly billing with GST invoices and dedicated account management",
    ],
    metrics: [
      { label: "Daily Tech Commuters", value: "3,500+" },
      { label: "Tech Corridors", value: "100% Covered" },
      { label: "Fleet Readiness", value: "15-Min Standby" },
    ],
    ctaText: "Setup Corporate Commute Plan",
    image: "/images/corporate/it-shuttle.jpg",
  },
  {
    id: "women-safety",
    title: "Women Safety & Escort Protocols",
    subtitle: "Uncompromising Night-Shift Security with Verified Chauffeurs",
    tag: "Zero-Compromise Security",
    description:
      "Comprehensive women employee escort and night-shift security protocols aligned with Cyberabad Police security mandates. Every night-shift trip is monitored live from our Kukatpally Command Center with safe doorstep drop confirmation.",
    icon: "ShieldCheckIcon",
    features: [
      "Police background-verified senior chauffeurs with zero disciplinary infractions",
      "Real-time GPS telematics with automated speed-limit and route deviation alerts",
      "Guaranteed safe doorstep drop: chauffeur confirms employee entry before vehicle departure",
      "Trained security escort provision for solo night drops between 8:00 PM and 6:00 AM",
    ],
    metrics: [
      { label: "Safety Rating", value: "5.0 / 5.0" },
      { label: "Verified Drivers", value: "100%" },
      { label: "Dispatch Monitoring", value: "24x7 Live" },
    ],
    ctaText: "Review Women Safety Protocols",
    image: "/images/corporate/women-safety.jpg",
  },
];
