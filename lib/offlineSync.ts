// Offline Storage & Queue Sync Manager for FoodConnect Bharat

export interface PendingAction {
    id: string;
    type: 'CREATE_OFFLINE_AREA' | 'SUBMIT_FOOD_REQUEST' | 'SUBMIT_FOOD_DONATION' | 'VERIFY_PICKUP' | 'CONFIRM_DELIVERY';
    payload: any;
    timestamp: string;
    synced: boolean;
}

const STORAGE_KEY_QUEUE = 'foodconnect_pending_queue';
const STORAGE_KEY_OFFLINE_AREAS = 'foodconnect_offline_areas';

export class OfflineSyncManager {
    // Get all queued pending actions from LocalStorage / IndexedDB
    static getPendingQueue(): PendingAction[] {
        if (typeof window === 'undefined') return [];
        try {
            const data = localStorage.getItem(STORAGE_KEY_QUEUE);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading pending queue:', e);
            return [];
        }
    }

    // Queue a action when user is offline or submits low-connectivity request
    static enqueueAction(type: PendingAction['type'], payload: any): PendingAction {
        const queue = this.getPendingQueue();
        const newAction: PendingAction = {
            id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            type,
            payload,
            timestamp: new Date().toISOString(),
            synced: false
        };

        queue.push(newAction);
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queue));
        }
        return newAction;
    }

    // Flush and sync all pending actions when internet returns
    static syncAll(onSuccessItem?: (action: PendingAction) => void): { count: number; items: PendingAction[] } {
        const queue = this.getPendingQueue();
        const syncedItems: PendingAction[] = [];

        const remainingQueue = queue.filter(item => {
            // Simulate API sync for each item
            item.synced = true;
            syncedItems.push(item);
            if (onSuccessItem) onSuccessItem(item);
            return false; // remove from queue
        });

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(remainingQueue));
        }

        return { count: syncedItems.length, items: syncedItems };
    }

    // Clear queue
    static clearQueue(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY_QUEUE);
        }
    }
}
