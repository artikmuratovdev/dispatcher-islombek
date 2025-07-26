export interface CreateNotificationRequest {
  endpoint?: string;
  keys?: {
    auth?: string;
    p256dh?: string;
  };
}

export interface PushNotificationRequest {
  id: string;
  body: {
    title: string;
    body?: string;
    data?: { url: string };
    vibrate: number[];
    actions: {
      action?: string;
      title?: string;
    }[];
  };
}
