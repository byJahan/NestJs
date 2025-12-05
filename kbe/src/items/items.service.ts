import { Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './items.dto';

export interface Item {
  id: number;
  name: string;
  price: number;
}

let idCounter = 4;
const items: Item[] = [
  { id: 1, name: 'Keyboard', price: 49.99 },
  { id: 2, name: 'Mouse',   price: 29.99 },
  { id: 3, name: 'Monitor', price: 199.99 },
];

@Injectable()
export class ItemsService {
  findAll(): Item[] {
    return items;
  }

  findOne(id: number): Item | undefined {
    return items.find(i => i.id === id);
  }

  create(dto: CreateItemDto): Item {
    const newItem: Item = { id: idCounter++, ...dto };
    items.push(newItem);
    return newItem;
  }

  update(id: number, dto: UpdateItemDto): Item | null {
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...dto };
    return items[idx];
  }

  remove(id: number): boolean {
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  }
}