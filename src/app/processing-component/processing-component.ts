import { Component, OnInit } from '@angular/core';
import { ProcessingService } from '../services/processing.service';
import { ProcessingOrder } from '../models/processing-order.model';
import { Job } from '../services/job.model';

@Component({
  selector: 'app-processing',
  standalone: false,
  templateUrl: './processing-component.html'
})
export class ProcessingComponent implements OnInit {

  orders: Job[] = [];

  // 🧭 Steps
  steps = ['VALIDATING', 'PAYMENT', 'COMPLIANCE', 'APPROVAL', 'COMPLETED'];

  constructor(private processingService: ProcessingService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // 📦 Load pending orders
  loadOrders() {
    this.processingService.getPendingOrders().subscribe({
      next: (data) => this.orders = data,
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