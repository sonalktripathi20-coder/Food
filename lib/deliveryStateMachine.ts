// Delivery State Machine & Verification Engine

export type DeliveryState =
    | 'PENDING_MATCH'
    | 'MATCHED'
    | 'WAITING_CONFIRMATION'
    | 'CONFIRMED'
    | 'DELIVERY_METHOD_SELECTED'
    | 'VOLUNTEER_SEARCH'
    | 'VOLUNTEER_ASSIGNED'
    | 'GOING_TO_PICKUP'
    | 'PICKUP_VERIFICATION'
    | 'PICKED_UP'
    | 'ON_THE_WAY'
    | 'ARRIVED'
    | 'DELIVERED'
    | 'BENEFICIARY_CONFIRMED'
    | 'SUCCESSFUL'
    | 'CANCELLED'
    | 'REJECTED'
    | 'PICKUP_FAILED'
    | 'DELIVERY_FAILED'
    | 'ESCALATED_TO_NGO'
    | 'EXPIRED';

export type DeliveryOption = 'DONOR_SELF' | 'VOLUNTEER' | 'NGO_SUPPORT';

export interface AuditTimestamp {
    state: DeliveryState;
    timestamp: string;
    actor: string;
    note?: string;
}

export interface VerificationChecklist {
    foodPresent: boolean;
    quantityMatch: boolean;
    packagingIntact: boolean;
    freshnessVerified: boolean;
    notes?: string;
    verifiedAt?: string;
}

export interface DeliveryRecord {
    id: string;
    donationId: string;
    requestId?: string;
    donorName: string;
    beneficiaryName: string;
    foodName: string;
    quantity: string;
    servings: number;
    deliveryOption: DeliveryOption;
    state: DeliveryState;
    volunteerId?: string;
    volunteerName?: string;
    ngoId?: string;
    ngoName?: string;
    donorConfirmed: boolean;
    beneficiaryConfirmed: boolean;
    pickupVerification?: VerificationChecklist;
    isEmergency: boolean;
    volunteerSearchStartedAt?: number;
    escalatedToNgo: boolean;
    history: AuditTimestamp[];
    pickupAddress: string;
    deliveryAddress: string;
    createdAt: string;
}

// Allowed State Transitions Validation
export const ALLOWED_TRANSITIONS: Record<DeliveryState, DeliveryState[]> = {
    PENDING_MATCH: ['MATCHED', 'EXPIRED', 'CANCELLED'],
    MATCHED: ['WAITING_CONFIRMATION', 'CANCELLED'],
    WAITING_CONFIRMATION: ['CONFIRMED', 'CANCELLED', 'REJECTED'],
    CONFIRMED: ['DELIVERY_METHOD_SELECTED', 'CANCELLED'],
    DELIVERY_METHOD_SELECTED: ['VOLUNTEER_SEARCH', 'GOING_TO_PICKUP', 'ESCALATED_TO_NGO', 'CANCELLED'],
    VOLUNTEER_SEARCH: ['VOLUNTEER_ASSIGNED', 'ESCALATED_TO_NGO', 'CANCELLED'],
    VOLUNTEER_ASSIGNED: ['GOING_TO_PICKUP', 'CANCELLED'],
    GOING_TO_PICKUP: ['PICKUP_VERIFICATION', 'CANCELLED', 'PICKUP_FAILED'],
    PICKUP_VERIFICATION: ['PICKED_UP', 'REJECTED', 'PICKUP_FAILED'],
    PICKED_UP: ['ON_THE_WAY', 'CANCELLED'],
    ON_THE_WAY: ['ARRIVED', 'DELIVERY_FAILED'],
    ARRIVED: ['DELIVERED', 'DELIVERY_FAILED'],
    DELIVERED: ['BENEFICIARY_CONFIRMED', 'DELIVERY_FAILED'],
    BENEFICIARY_CONFIRMED: ['SUCCESSFUL'],
    SUCCESSFUL: [],
    CANCELLED: [],
    REJECTED: [],
    PICKUP_FAILED: ['ESCALATED_TO_NGO', 'CANCELLED'],
    DELIVERY_FAILED: ['ESCALATED_TO_NGO', 'CANCELLED'],
    ESCALATED_TO_NGO: ['VOLUNTEER_ASSIGNED', 'GOING_TO_PICKUP', 'SUCCESSFUL', 'CANCELLED'],
    EXPIRED: []
};

// Check if state transition is valid
export function canTransition(currentState: DeliveryState, targetState: DeliveryState): boolean {
    return ALLOWED_TRANSITIONS[currentState]?.includes(targetState) ?? false;
}

// Verify Pickup Checklist
export function isPickupVerificationValid(checklist: VerificationChecklist): boolean {
    return (
        checklist.foodPresent &&
        checklist.quantityMatch &&
        checklist.packagingIntact &&
        checklist.freshnessVerified
    );
}

// Check 5-minute volunteer fallback escalation rule
export function checkVolunteerTimeoutEscalation(
    delivery: DeliveryRecord,
    timeoutMs: number = 300000 // 5 minutes default
): boolean {
    if (
        delivery.state === 'VOLUNTEER_SEARCH' &&
        delivery.volunteerSearchStartedAt &&
        Date.now() - delivery.volunteerSearchStartedAt >= timeoutMs
    ) {
        return true;
    }
    return false;
}
