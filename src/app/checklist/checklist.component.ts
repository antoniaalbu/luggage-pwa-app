import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

interface ChecklistItem {
  name: string;
  checked: boolean;
  category: string;
  priority?: 'normal' | 'high';
}

@Component({
  selector: 'app-luggage-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LuggageChecklistComponent implements OnInit {
  // Storage key for localStorage
  readonly storageKey: string = 'luggage-checklist-items';
  
  // Default items that will be used on first run
  defaultItems: ChecklistItem[] = [
    // Essentials
    { name: 'Passport', checked: false, category: 'essentials', priority: 'high' },
    { name: 'Wallet', checked: false, category: 'essentials', priority: 'high' },
    { name: 'Phone & Charger', checked: false, category: 'essentials', priority: 'high' },
    { name: 'Travel Documents', checked: false, category: 'essentials', priority: 'high' },
    
    // Clothing
    { name: 'T-shirts', checked: false, category: 'clothing' },
    { name: 'Pants/Shorts', checked: false, category: 'clothing' },
    { name: 'Underwear', checked: false, category: 'clothing' },
    { name: 'Socks', checked: false, category: 'clothing' },
    { name: 'Business Attire', checked: false, category: 'clothing' },
    { name: 'Casual Outfits', checked: false, category: 'clothing' },
    
    // Toiletries
    { name: 'Toothbrush', checked: false, category: 'toiletries' },
    { name: 'Toothpaste', checked: false, category: 'toiletries' },
    { name: 'Deodorant', checked: false, category: 'toiletries' },
    { name: 'Shampoo', checked: false, category: 'toiletries' },
    
    // Electronics
    { name: 'Laptop', checked: false, category: 'electronics', priority: 'high' },
    { name: 'Headphones', checked: false, category: 'electronics' },
    { name: 'Camera', checked: false, category: 'electronics' },
    
    // Other
    { name: 'Books/Reading Material', checked: false, category: 'other' },
    { name: 'Snacks', checked: false, category: 'other' }
  ];
  
  // Current items (will be loaded from localStorage or defaults)
  items: ChecklistItem[] = [];
  
  newItem: string = '';
  newItemCategory: string = 'essentials';
  
  ngOnInit(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.items = parsed;
      } else {
        this.items = [...this.defaultItems];
        this.saveToStorage(); // Save the defaults on first run
      }
    } else {
      this.items = [...this.defaultItems];
      this.saveToStorage(); // Save the defaults on first run
    }
  }
  
  // Save current items to localStorage
  saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
  
  addItem() {
    if (this.newItem.trim()) {
      this.items.push({
        name: this.newItem,
        checked: false,
        category: this.newItemCategory
      });
      this.newItem = '';
      this.saveToStorage(); // Save after adding item
    }
  }
  
  removeItem(index: number) {
    this.items.splice(index, 1);
    this.saveToStorage(); // Save after removing item
  }
  
  toggleItem(index: number) {
    // Get the current state
    const currentChecked = this.items[index].checked;
    
    // Toggle the state (this will update the checkbox, cross out the text, and update the progress bar)
    this.items[index].checked = !currentChecked;
    
    // Save to localStorage
    this.saveToStorage();
  }
  
  getItemsByCategory(category: string): ChecklistItem[] {
    return this.items.filter(item => item.category === category);
  }
  
  getItemIndex(item: ChecklistItem): number {
    return this.items.indexOf(item);
  }
  
  getCompletedCount(): number {
    return this.items.filter(item => item.checked).length;
  }
  
  getProgressPercentage(): number {
    if (this.items.length === 0) return 0;
    return Math.round((this.getCompletedCount() / this.items.length) * 100);
  }
  
  // Method to reset checklist to default items
  resetToDefaults(): void {
    this.items = JSON.parse(JSON.stringify(this.defaultItems)); // Deep clone defaults
    this.saveToStorage();
  }
}