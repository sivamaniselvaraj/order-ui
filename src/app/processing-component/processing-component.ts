import { Component, OnInit } from '@angular/core';
import { ProcessingService } from '../services/processing.service';
import { ProcessingOrder } from '../models/processing-order.model';
import { Job } from '../services/job.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-processing',
  standalone: false,
  templateUrl: './processing-component.html'
})
export class ProcessingComponent implements OnInit {


   private ordersSubject = new BehaviorSubject<Job[]>([]);
    orders$ = this.ordersSubject.asObservable();

  // 🧭 Steps
  steps = ['VALIDATING', 'PAYMENT', 'COMPLIANCE', 'APPROVAL', 'COMPLETED'];

  constructor(private processingService: ProcessingService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // 📦 Load pending orders
  loadOrders() {
    this.processingService.getProcessingOrders().subscribe({
      next: (data) => this.ordersSubject.next(data),
      error: (err) => console.error('Error loading orders', err)
    });
  }

  // 🔄 Get next step
  getNextStatus(current: string): string {
    const index = this.steps.indexOf(current);
    return index >= 0 && index < this.steps.length - 1
      ? this.steps[index + 1]
      : current;
  }

  // ▶️ Move to next step
  processNext(order: ProcessingOrder) {
    const nextStatus = this.getNextStatus(order.status);

    // ⚡ Optimistic update
    order.status = nextStatus;

    this.processingService.updateStatus(order.id, nextStatus).subscribe({
      next: () => console.log('Updated'),
      error: () => {
        console.error('Failed update');
        this.loadOrders(); // rollback
      }
    });
  }

  // ❌ Cancel order
  cancel(order: ProcessingOrder) {
    order.status = 'CANCELLED';

    this.processingService.cancelOrder(order.id).subscribe({
      next: () => console.log('Cancelled'),
      error: () => {
        console.error('Cancel failed');
        this.loadOrders();
      }
    });
  }
}