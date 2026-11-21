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
    subtitle: "24x7 Continuous Shift Transit for Bengaluru Industrial Belts",
    tag: "Pharmaceutical & Manufacturing Corridors",
    description:
      "Reliable, punctual, round-the-clock shift-based employee transport for Bengaluru's pharmaceutical and manufacturing clusters across Electronic City, Bommasandra, Jigani and Hebbal. Zero-delay roster compliance with sanitized AC cabs and passenger buses, subject to availability.",
    icon: "BeakerIcon",
    features: [
      "24x7 rotational shift pickups (Morning, General, Evening & Night shifts)",
      "Strict compliance with industrial safety standards and GPS geo-fencing",
      "Dedicated backup vehicles stationed near Electronic City and Begur for zero downtime",
      "Route optimization for residential clusters across HSR Layout, BTM Layout, JP Nagar and Jayanagar",
    ],
    metrics: [
      { label: "Punctuality Rate", value: "99.4%" },
      { label: "Shift Coverage", value: "24x7x365" },
      { label: "Industrial Hubs", value: "8+ Corridors" },
    ],
    ctaText: "Request Pharma Commute Proposal",
    image: "/images/corporate/fleet-boarding-corporate.jpg",
  },
  {
    id: "it-transport",
    title: "IT & Tech Shuttles",
    subtitle: "Premium Daily Executive Commute for Bengaluru Tech Corridors",
    tag: "Whitefield & Outer Ring Road",
    description:
      "Comfortable corporate shuttles, dedicated cabs and executive vehicles connecting Whitefield, Marathahalli, Indiranagar, Koramangala, Electronic City and the Outer Ring Road. FASTag enabled, sanitized, and driven by verified chauffeurs.",
    icon: "BuildingOffice2Icon",
    features: [
      "Custom point-to-point and nodal pickup routing with real-time roster sync",
      "Executive Force Urbania, Tempo Travellers and Passenger Buses (25, 33, 40, 45, 50 & 52 Seater), subject to availability",
      "Digital trip sheets with odometer and GPS tracking for seamless audits",
      "Corporate monthly billing with GST invoices and dedicated account management",
    ],
    metrics: [
      { label: "Daily Tech Commuters", value: "3,500+" },
      { label: "Tech Corridors", value: "100% Covered" },
      { label: "Fleet Readiness", value: "15-Min Standby" },
    ],
    ctaText: "Setup Corporate Commute Plan",
    image: "/images/corporate/fleet-boarding-corporate.jpg",
  },
  {
    id: "women-safety",
    title: "Women Safety & Escort Protocols",
    subtitle: "Uncompromising Night-Shift Security with Verified Chauffeurs",
    tag: "Zero-Compromise Security",
    description:
      "Comprehensive women employee escort and night-shift security protocols aligned with Bengaluru City Police safety guidance. Every late-night trip is monitored live from our Begur dispatch desk with safe doorstep drop confirmation across Bengaluru.",
    icon: "ShieldCheckIcon",
    features: [
      "Police background-verified senior chauffeurs with zero disciplinary infractions",
      "Real-time GPS tracking with automated speed-limit and route-deviation alerts",
      "Guaranteed safe doorstep drop: chauffeur confirms employee entry before vehicle departure",
      "Trained escort provision for solo night drops between 8:00 PM and 6:00 AM, subject to availability",
    ],
    metrics: [
      { label: "Safety Rating", value: "5.0 / 5.0" },
      { label: "Verified Drivers", value: "100%" },
      { label: "Dispatch Monitoring", value: "24x7 Live" },
    ],
    ctaText: "Review Women Safety Protocols",
    image: "/images/corporate/command-center-dispatch.jpg",
  },
];
