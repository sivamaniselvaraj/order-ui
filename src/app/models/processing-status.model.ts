export type ProcessingStepStatus =
  | 'VALIDATING'
  | 'PAYMENT'
  | 'COMPLIANCE'
  | 'APPROVAL'
  | 'COMPLETED'
  | 'FAILED';

export interface ProcessingStatus {
  statusId: number;
  jobId: number;

  status: ProcessingStepStatus;
  message?: string;

  createdAt: string;
}