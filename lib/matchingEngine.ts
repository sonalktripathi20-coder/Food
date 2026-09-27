// Smart Matching Engine for FoodConnect Bharat

export interface DietaryRequirement {
  type: 'VEG' | 'JAIN' | 'NON_VEG';
  noOnionGarlic?: boolean;
}

export interface FoodDonationItem {
  id: string;
  foodName: string;
  servingsCount: number;
  dietary: 'VEG' | 'JAIN' | 'NON_VEG';
  usableRemainingHours: number;
  latitude: number;
  longitude: number;
  isEmergency?: boolean;
}

export interface FoodRequestItem {
  id: string;
  peopleCount: number;
  dietary: 'VEG' | 'JAIN' | 'NON_VEG';
  noOnionGarlic?: boolean;
  urgency: 'NORMAL' | 'URGENT' | 'EMERGENCY';
  latitude: number;
  longitude: number;
  priorityGroup?: string;
}

// Calculate Haversine distance in kilometers
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Check Dietary Compatibility strictly
export function isDietaryCompatible(
  foodDietary: 'VEG' | 'JAIN' | 'NON_VEG',
  reqDietary: 'VEG' | 'JAIN' | 'NON_VEG',
  reqNoOnionGarlic: boolean = false
): boolean {
  // Rule 1: JAIN requirement accepts only JAIN food (or VEG explicitly certified without onion/garlic)
  if (reqDietary === 'JAIN') {
    return foodDietary === 'JAIN';
  }

  // Rule 2: VEG requirement accepts VEG or JAIN food, never NON_VEG
  if (reqDietary === 'VEG') {
    return foodDietary === 'VEG' || foodDietary === 'JAIN';
  }

  // Rule 3: NON_VEG requirement accepts any food type
  if (reqDietary === 'NON_VEG') {
    return true;
  }

  return false;
}

// Calculate Match Compatibility Score (0 to 100)
export function calculateMatchScore(
  donation: FoodDonationItem,
  request: FoodRequestItem
): { score: number; isCompatible: boolean; distanceKm: number; reasons: string[] } {
  const reasons: string[] = [];

  // Strict Dietary Check
  const compatibleDiet = isDietaryCompatible(
    donation.dietary,
    request.dietary,
    request.noOnionGarlic
  );

  if (!compatibleDiet) {
    return {
      score: 0,
      isCompatible: false,
      distanceKm: 0,
      reasons: [`Incompatible dietary preference: Food is ${donation.dietary}, Request is ${request.dietary}`]
    };
  }

  const distanceKm = calculateDistanceKm(
    donation.latitude,
    donation.longitude,
    request.latitude,
    request.longitude
  );

  // Distance Score (Max 40 points) - Closer is better
  let distanceScore = Math.max(0, 40 - distanceKm * 4);

  // Quantity Match Score (Max 30 points)
  const quantityRatio = Math.min(donation.servingsCount, request.peopleCount) / Math.max(donation.servingsCount, request.peopleCount);
  const quantityScore = Math.round(quantityRatio * 30);

  // Urgency & Expiry Score (Max 30 points)
  let urgencyScore = 10;
  if (request.urgency === 'EMERGENCY' || donation.isEmergency || donation.usableRemainingHours <= 2) {
    urgencyScore = 30;
    reasons.push('High Priority / Emergency Match');
  } else if (request.urgency === 'URGENT' || donation.usableRemainingHours <= 4) {
    urgencyScore = 20;
  }

  const totalScore = Math.round(distanceScore + quantityScore + urgencyScore);
  reasons.push(`${distanceKm} km distance`, `Quantity ratio ${Math.round(quantityRatio * 100)}%`);

  return {
    score: totalScore,
    isCompatible: true,
    distanceKm,
    reasons
  };
}
