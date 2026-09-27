// 🚨 Food Rescue Missions & Instant Rescue Engine

export type MissionStatus =
    | 'CREATED'
    | 'RECRUITING'
    | 'VOLUNTEERS_ASSIGNED'
    | 'PICKUP_IN_PROGRESS'
    | 'FOOD_VERIFIED'
    | 'DISTRIBUTION_IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'EXPIRED';

export interface FoodRescueMission {
    id: string;
    missionCode: string; // e.g. #FRM-901
    title: string;
    sourceType: 'Wedding' | 'Bhandara' | 'Hotel' | 'Catering Surplus' | 'Restaurant Closing';
    pickupLocation: string;
    latitude: number;
    longitude: number;
    totalServings: number;
    distributedServings: number;
    volunteersNeeded: number;
    volunteersAssigned: number;
    status: MissionStatus;
    remainingHours: number;
    createdAt: string;
}

export class FoodRescueMissionEngine {
    // Calculate mission distribution progress percentage
    static getMissionProgress(mission: FoodRescueMission): number {
        if (mission.totalServings === 0) return 0;
        return Math.min(100, Math.round((mission.distributedServings / mission.totalServings) * 100));
    }
}
