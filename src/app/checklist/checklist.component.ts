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
  
  readonly storageKey: string = 'luggage-checklist-items';
  
  defaultItems: ChecklistItem[] = [
    
    { name: 'Passport', checked: false, category: 'essentials', priority: 'high' },
    { name: 'Wallet', checked: false, category: 'essentials', priority: 'high' },
    { name: 'Phone & Charger', checked: false, category: 'essentials', priority: 'high' },
    { name: 'Travel Documents', checked: false, category: 'essentials', priority: 'high' },
    
   
    { name: 'T-shirts', checked: false, category: 'clothing' },
    { name: 'Pants/Shorts', checked: false, category: 'clothing' },
    { name: 'Underwear', checked: false, category: 'clothing' },
    { name: 'Socks', checked: false, category: 'clothing' },
    { name: 'Business Attire', checked: false, category: 'clothing' },
    { name: 'Casual Outfits', checked: false, category: 'clothing' },
    
  
    { name: 'Toothbrush', checked: false, category: 'toiletries' },
    { name: 'Toothpaste', checked: false, category: 'toiletries' },
    { name: 'Deodorant', checked: false, category: 'toiletries' },
    { name: 'Shampoo', checked: false, category: 'toiletries' },
    
    
    { name: 'Laptop', checked: false, category: 'electronics',  },
    { name: 'Headphones', checked: false, category: 'electronics' },
    { name: 'Camera', checked: false, category: 'electronics' },
    
    
    { name: 'Books/Reading Material', checked: false, category: 'other' },
    { name: 'Snacks', checked: false, category: 'other' }
  ];
  
  
  items: ChecklistItem[] = [];
  
  newItem: string = '';
  newItemCategory: string = 'essentials';
  newItemPriority: 'normal' | 'high' = 'normal';

  
  ngOnInit(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.items = parsed;
      } else {
        this.items = [...this.defaultItems];
        this.saveToStorage(); 
      }
    } else {
      this.items = [...this.defaultItems];
      this.saveToStorage(); 
    }
  }
  
 
  saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
  
  addItem() {
    if (this.newItem.trim()) {
      this.items.push({
        name: this.newItem,
        checked: false,
        category: this.newItemCategory,
        priority: this.newItemPriority
      });
      this.newItem = '';
      this.newItemPriority = 'normal';
      this.saveToStorage(); 
    }
  }
  
  
  removeItem(index: number) {
    this.items.splice(index, 1);
    this.saveToStorage(); 
  }
  
  toggleItem(index: number) {
    
    const currentChecked = this.items[index].checked;
    
    // Toggle the state (this will update the checkbox, cross out the text, and update the progress bar)
    this.items[index].checked = !currentChecked;
    
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
  
  resetToDefaults(): void {
    this.items = JSON.parse(JSON.stringify(this.defaultItems));
    this.saveToStorage();
  }
}