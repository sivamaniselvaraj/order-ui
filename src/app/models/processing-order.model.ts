export interface ProcessingOrder {
  id: number;
  status: string; // VALIDATING, PAYMENT, COMPLIANCE, APPROVAL, COMPLETED, CANCELLED
}