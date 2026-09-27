// Food Quantity Splitting & Partial Matching Engine

export interface QuantitySplitRecord {
    donationId: string;
    totalServings: number;
    allocatedServings: number;
    remainingServings: number;
    allocations: {
        id: string;
        recipientName: string;
        recipientType: 'BENEFICIARY' | 'NGO' | 'KITCHEN' | 'SHELTER';
        servings: number;
        allocatedAt: string;
    }[];
}

export class QuantitySplittingEngine {
    // Allocate portion of available donation to a request/recipient safely
    static allocateQuantity(
        record: QuantitySplitRecord,
        requestServings: number,
        recipientName: string,
        recipientType: 'BENEFICIARY' | 'NGO' | 'KITCHEN' | 'SHELTER'
    ): { success: boolean; allocatedServings: number; remainingServings: number; message: string } {
        if (requestServings <= 0) {
            return {
                success: false,
                allocatedServings: 0,
                remainingServings: record.remainingServings,
                message: 'Invalid requested servings count.'
            };
        }

        if (record.remainingServings <= 0) {
            return {
                success: false,
                allocatedServings: 0,
                remainingServings: 0,
                message: 'No remaining food available for allocation.'
            };
        }

        // Determine actual servings to allocate (Partial match if request > remaining)
        const actualAllocated = Math.min(record.remainingServings, requestServings);

        record.allocatedServings += actualAllocated;
        record.remainingServings -= actualAllocated;

        record.allocations.push({
            id: `alloc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            recipientName,
            recipientType,
            servings: actualAllocated,
            allocatedAt: new Date().toISOString()
        });

        const isPartial = actualAllocated < requestServings;

        return {
            success: true,
            allocatedServings: actualAllocated,
            remainingServings: record.remainingServings,
            message: isPartial
                ? `Partial match: Allocated ${actualAllocated} of ${requestServings} requested meals. ${record.remainingServings} meals still available.`
                : `Full match: Allocated ${actualAllocated} meals. ${record.remainingServings} meals remaining.`
        };
    }
}
