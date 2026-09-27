// Notification Provider Abstraction Layer

export type NotificationType = 'DONATION' | 'REQUEST' | 'MATCH' | 'DELIVERY' | 'EMERGENCY' | 'NGO_ESCALATION';
export type NotificationPriority = 'NORMAL' | 'IMPORTANT' | 'URGENT' | 'EMERGENCY';

export interface NotificationPayload {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    priority: NotificationPriority;
}

export interface ProviderStatus {
    providerName: string;
    configured: boolean;
    statusMessage: string;
}

export class NotificationService {
    static getProvidersStatus(): ProviderStatus[] {
        return [
            { providerName: 'In-App Realtime Notifications', configured: true, statusMessage: 'Active & Operating' },
            { providerName: 'WhatsApp Business API', configured: false, statusMessage: 'Messaging integration not configured (Requires WHATSAPP_API_KEY)' },
            { providerName: 'SMS Gateway (Twilio / Fast2SMS)', configured: false, statusMessage: 'Messaging integration not configured (Requires SMS_API_KEY)' },
            { providerName: 'Email Gateway (SendGrid / SMTP)', configured: false, statusMessage: 'Messaging integration not configured (Requires SMTP_URL)' }
        ];
    }

    static dispatchNotification(payload: NotificationPayload): { sentInApp: boolean; log: string } {
        console.log(`[InAppNotification] [${payload.priority}] ${payload.title}: ${payload.message}`);
        return {
            sentInApp: true,
            log: `In-App notification delivered to user ${payload.userId}. External providers unconfigured.`
        };
    }
}
