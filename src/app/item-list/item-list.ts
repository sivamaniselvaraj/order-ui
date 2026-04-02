import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../models/CategoryItem';
import { CartService } from '../services/CartService';
import { Item } from '../models/Item';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList implements OnInit {

  showSuccess = false;
  loading = false;

  categories: CategoryItem[] = [
    {
      "category": "Core Components",
      "items": [
        {
          "id": 1,
          "name": "CPU (Processor)",
          "price": 25000,
          "description": "Main processing unit of the computer",
          "image": "assets/images/cpu.png"
        },
        {
          "id": 2,
          "name": "Motherboard",
          "price": 15000,
          "description": "Connects all components together",
          "image": "assets/images/motherboard.png"
        },
        {
          "id": 3,
          "name": "RAM (Memory)",
          "price": 8000,
          "description": "Temporary memory for running applications",
          "image": "assets/images/ram.png"
        },
        {
          "id": 4,
          "name": "Storage (SSD/HDD)",
          "price": 6000,
          "description": "Permanent data storage",
          "image": "assets/images/storage.png"
        },
        {
          "id": 5,
          "name": "GPU (Graphics Card)",
          "price": 30000,
          "description": "Handles graphics and rendering",
          "image": "assets/images/gpu.png"
        }
      ]
    },
    {
      "category": "Power & Cooling",
      "items": [
        {
          "id": 6,
          "name": "Power Supply Unit (PSU)",
          "price": 5000,
          "description": "Supplies power to all components",
          "image": "assets/images/psu.png"
        },
        {
          "id": 7,
          "name": "CPU Cooler",
          "price": 3000,
          "description": "Keeps processor temperature under control",
          "image": "assets/images/cooler.png"
        },
        {
          "id": 8,
          "name": "Case Fans",
          "price": 1500,
          "description": "Improves airflow inside the cabinet",
          "image": "assets/images/fans.png"
        }
      ]
    },
    {
      "category": "Build & Structure",
      "items": [
        {
          "id": 9,
          "name": "Computer Case (Cabinet)",
          "price": 4000,
          "description": "Houses all internal components",
          "image": "assets/images/case.png"
        },
        {
          "id": 10,
          "name": "Thermal Paste",
          "price": 500,
          "description": "Improves heat transfer between CPU and cooler",
          "image": "assets/images/thermal.png"
        }
      ]
    },
    {
      "category": "Peripherals (Optional)",
      "items": [
        {
          "id": 11,
          "name": "Monitor",
          "price": 12000,
          "description": "Display screen",
          "image": "assets/images/monitor.png"
        },
        {
          "id": 12,
          "name": "Keyboard",
          "price": 1000,
          "description": "Input device for typing",
          "image": "assets/images/keyboard.png"
        },
        {
          "id": 13,
          "name": "Mouse",
          "price": 800,
          "description": "Pointing device",
          "image": "assets/images/mouse.png"
        },
        {
          "id": 14,
          "name": "Speakers / Headphones",
          "price": 2000,
          "description": "Audio output devices",
          "image": "assets/images/audio.png"
        },
        {
          "id": 15,
          "name": "Webcam",
          "price": 1500,
          "description": "Video input device",
          "image": "assets/images/webcam.png"
        }
      ]
    },
    {
      "category": "Networking & Extras",
      "items": [
        {
          "id": 16,
          "name": "Wi-Fi Card / Adapter",
          "price": 1200,
          "description": "Wireless internet connectivity",
          "image": "assets/images/wifi.png"
        },
        {
          "id": 17,
          "name": "Ethernet Cable",
          "price": 300,
          "description": "Wired internet connection",
          "image": "assets/images/ethernet.png"
        },
        {
          "id": 18,
          "name": "Operating System (OS)",
          "price": 10000,
          "description": "Software like Windows or Linux",
          "image": "assets/images/os.png"
        }
      ]
    }
  ]

  constructor(private cartService: CartService) {

  }
  ngOnInit(): void {

  }

  addToCart(item: Item) {
    this.cartService.addItem(item);
  }

}
