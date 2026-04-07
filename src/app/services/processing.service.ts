import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessingOrder } from '../models/processing-order.model';
import { Job } from './job.model';

@Injectable({
    providedIn: 'root'
})
export class ProcessingService {

    private baseUrl = 'http://localhost:8082/processing';

    constructor(private http: HttpClient) { }


    // 📦 Fetch pending orders
    getPendingOrders(): Observable<Job[]> {
        const key = this.generateIdempotencyKey();
        localStorage.setItem('lastOrderKey', key);
        return this.http.get<Job[]>(`${this.baseUrl}/pending`, {
            headers: {
                'Idempotency-Key': key
            }
        });
    }

    // 🔄 Update status (RequestParam)
    updateStatus(orderId: number, status: string): Observable<any> {
        return this.http.post(
            `${this.baseUrl}/${orderId}/status?status=${status}`,
            {}
        );
    }

    // ❌ Cancel order
    cancelOrder(orderId: number): Observable<any> {
        return this.http.post(
            `${this.baseUrl}/${orderId}/status?status=CANCELLED`,
            {}
        );
    }

    generateIdempotencyKey(): string {
        return crypto.randomUUID();
    }
}