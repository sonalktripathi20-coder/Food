// Food Lifecycle & Smart Expiry Engine for FoodConnect Bharat

export type FoodLifecycleState =
    | 'CREATED'
    | 'AVAILABLE'
    | 'MATCHED'
    | 'CONFIRMATION_PENDING'
    | 'CONFIRMED'
    | 'DELIVERY_ASSIGNED'
    | 'PICKUP_PENDING'
    | 'PICKUP_VERIFICATION'
    | 'VERIFIED'
    | 'PICKED_UP'
    | 'IN_TRANSIT'
    | 'ARRIVED'
    | 'DELIVERED'
    | 'BENEFICIARY_CONFIRMED'
    | 'SUCCESSFUL'
    | 'CANCELLED'
    | 'EXPIRED'
    | 'REJECTED'
    | 'PICKUP_FAILED'
    | 'DELIVERY_FAILED'
    | 'ESCALATED_TO_NGO'
    | 'PARTIALLY_DISTRIBUTED';

export type ExpiryStatus = 'NORMAL' | 'TIME_SENSITIVE' | 'EMERGENCY' | 'EXPIRED';

export interface FoodExpiryStatus {
    status: ExpiryStatus;
    remainingHours: number;
    remainingMinutes: number;
    formattedString: string;
    isEmergency: boolean;
    shouldAutoTransitionEmergency: boolean;
}

// Allowed state transition matrix
const LIFECYCLE_TRANSITIONS: Record<FoodLifecycleState, FoodLifecycleState[]> = {
    CREATED: ['AVAILABLE', 'CANCELLED', 'EXPIRED'],
    AVAILABLE: ['MATCHED', 'CONFIRMATION_PENDING', 'CANCELLED', 'EXPIRED', 'PARTIALLY_DISTRIBUTED'],
    MATCHED: ['CONFIRMATION_PENDING', 'CANCELLED', 'EXPIRED'],
    CONFIRMATION_PENDING: ['CONFIRMED', 'REJECTED', 'CANCELLED'],
    CONFIRMED: ['DELIVERY_ASSIGNED', 'CANCELLED'],
    DELIVERY_ASSIGNED: ['PICKUP_PENDING', 'ESCALATED_TO_NGO', 'CANCELLED'],
    PICKUP_PENDING: ['PICKUP_VERIFICATION', 'PICKUP_FAILED', 'CANCELLED'],
    PICKUP_VERIFICATION: ['VERIFIED', 'REJECTED', 'PICKUP_FAILED'],
    VERIFIED: ['PICKED_UP', 'CANCELLED'],
    PICKED_UP: ['IN_TRANSIT', 'CANCELLED'],
    IN_TRANSIT: ['ARRIVED', 'DELIVERY_FAILED'],
    ARRIVED: ['DELIVERED', 'DELIVERY_FAILED'],
    DELIVERED: ['BENEFICIARY_CONFIRMED', 'DELIVERY_FAILED'],
    BENEFICIARY_CONFIRMED: ['SUCCESSFUL'],
    SUCCESSFUL: [],
    CANCELLED: [],
    EXPIRED: [],
    REJECTED: [],
    PICKUP_FAILED: ['ESCALATED_TO_NGO', 'CANCELLED'],
    DELIVERY_FAILED: ['ESCALATED_TO_NGO', 'CANCELLED'],
    ESCALATED_TO_NGO: ['DELIVERY_ASSIGNED', 'SUCCESSFUL', 'CANCELLED'],
    PARTIALLY_DISTRIBUTED: ['AVAILABLE', 'SUCCESSFUL', 'CANCELLED']
};

export function validateLifecycleTransition(
    currentState: FoodLifecycleState,
    targetState: FoodLifecycleState
): boolean {
    return LIFECYCLE_TRANSITIONS[currentState]?.includes(targetState) ?? false;
}

// Calculate remaining food lifespan based on preparation & usable deadline
export function calculateFoodExpiry(
    usableDeadlineIso: string,
    emergencyAlertSent: boolean = false
): FoodExpiryStatus {
    const deadline = new Date(usableDeadlineIso).getTime();
    const now = Date.now();
    const diffMs = deadline - now;

    if (diffMs <= 0) {
        return {
            status: 'EXPIRED',
            remainingHours: 0,
            remainingMinutes: 0,
            formattedString: 'Expired',
            isEmergency: false,
            shouldAutoTransitionEmergency: false
        };
    }

    const totalMinutes = Math.floor(diffMs / 60000);
    const remainingHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const hoursDecimal = Math.round((diffMs / 3600000) * 10) / 10;

    let status: ExpiryStatus = 'NORMAL';
    let isEmergency = false;
    let shouldAutoTransition = false;

    if (hoursDecimal <= 2.0) {
        status = 'EMERGENCY';
        isEmergency = true;
        if (!emergencyAlertSent) {
            shouldAutoTransition = true;
        }
    } else if (hoursDecimal <= 6.0) {
        status = 'TIME_SENSITIVE';
    }

    const formattedString =
        remainingHours > 0
            ? `⏱ ${remainingHours}h ${remainingMinutes}m remaining`
            : `⏱ ${remainingMinutes}m remaining`;

    return {
        status,
        remainingHours: hoursDecimal,
        remainingMinutes: totalMinutes,
        formattedString,
        isEmergency,
        shouldAutoTransitionEmergency: shouldAutoTransition
    };
}
