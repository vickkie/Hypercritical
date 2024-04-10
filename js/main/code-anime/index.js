import { Item } from './item.js';

[...document.querySelectorAll('.grid-itemz > .grid__item-img')].forEach(img => new Item(img));