// NotificationService for Real-Time Events & Judge Demo

export type NotificationCategory =
    | 'FOOD_REQUEST'
    | 'DONOR_ACCEPTED'
    | 'CONFIRMATION_REQUIRED'
    | 'DELIVERY_TASK'
    | 'VOLUNTEER_ASSIGNED'
    | 'PICKUP_STARTED'
    | 'FOOD_VERIFIED'
    | 'ON_THE_WAY'
    | 'ARRIVED'
    | 'DELIVERED'
    | 'SUCCESSFUL';

export interface AppNotification {
    id: string;
    recipientRole: 'DONOR' | 'BENEFICIARY' | 'VOLUNTEER' | 'NGO' | 'ADMIN';
    category: NotificationCategory;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    actionText?: string;
    actionTab?: string;
}

export class NotificationService {
    private static notifications: AppNotification[] = [];

    static addNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): AppNotification {
        const newNotif: AppNotification = {
            ...notif,
            id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };

        this.notifications.unshift(newNotif);
        return newNotif;
    }

    static getUnreadCount(role: string): number {
        return this.notifications.filter(n => n.recipientRole === role && !n.read).length;
    }

    static getNotificationsForRole(role: string): AppNotification[] {
        return this.notifications.filter(n => n.recipientRole === role);
    }

    static markAllRead(role: string) {
        this.notifications.forEach(n => {
            if (n.recipientRole === role) n.read = true;
        });
    }

    static clearAll() {
        this.notifications = [];
    }
}
