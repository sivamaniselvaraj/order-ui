import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StatusStepService {

    getNextStatus(currentStatus: string): string {
        switch (currentStatus) {
            case 'CREATED':
                return 'PROCESSING';
            case 'PROCESSING':
                return 'COMPLETED';
            default:
                return currentStatus;
        }
    }
}