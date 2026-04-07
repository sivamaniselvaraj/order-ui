import { ProcessingStatus } from "../models/processing-status.model";

export type JobStatus =
    | 'CREATED'
    | 'STARTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'FAILED';

export interface Job {
    jobId: number;
    orderId: number;
    jobType?: string;
    jobStatus: JobStatus;

    createdAt: string;      // ISO string
    startedAt?: string | null;
    completedAt?: string | null;
    processingStatus: ProcessingStatus[] | null
}