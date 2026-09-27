// Delivery Batches & Multi-Stop Routing Engine

export interface BatchStop {
    stopOrder: number;
    destinationName: string;
    recipientType: 'BENEFICIARY' | 'NGO' | 'KITCHEN' | 'SHELTER';
    address: string;
    latitude: number;
    longitude: number;
    servingsCount: number;
    isDelivered: boolean;
    deliveredAt?: string;
}

export interface DeliveryBatch {
    batchNumber: string; // e.g. #FCB-1024
    donorName: string;
    pickupAddress: string;
    totalServings: number;
    assignedDriver?: string;
    stops: BatchStop[];
    createdAt: string;
}

export class DeliveryBatchManager {
    // Calculate total batch completion percentage
    static calculateBatchProgress(batch: DeliveryBatch): { completedStops: number; totalStops: number; percent: number } {
        const totalStops = batch.stops.length;
        if (totalStops === 0) return { completedStops: 0, totalStops: 0, percent: 100 };

        const completedStops = batch.stops.filter(s => s.isDelivered).length;
        const percent = Math.round((completedStops / totalStops) * 100);

        return { completedStops, totalStops, percent };
    }
}
