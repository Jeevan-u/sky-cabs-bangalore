export const PRIME_SEDAN_PHOTOS: string[] = [
  "/images/fleet/prime-sedan-1.png",
  "/images/fleet/prime-sedan-2.png",
  "/images/fleet/prime-sedan-3.png",
  "/images/fleet/prime-sedan-4.png",
  "/images/fleet/prime-sedan-5.png",
  "/images/fleet/prime-sedan-6.png",
  "/images/fleet/prime-sedan-7.png",
];

export function getVehiclePhotos(image: string, vehicleId?: string): string[] {
  if (vehicleId === "prime-sedan") return PRIME_SEDAN_PHOTOS;
  return [image];
}
