export interface Notification {
  notificationId: number;
  userId: number;
  orderId: number;
  message: string;
  createdAt: string;
  deliveryStatuses: any[];
}