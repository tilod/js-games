import { Item } from './interfaces';

export default class World {
  static readonly ALL_ITEMS = '__all__';

  private items: Map<String, Array<Item>>;

  constructor() {
    this.items = new Map();
    this.items.set(World.ALL_ITEMS, []);
  }

  addItem(item: Item, tags: Array<String>): void {
    this.items.get(World.ALL_ITEMS).push(item);

    for (const tag of tags) {
      const tagList: Array<Item> = this.items.get(tag);
      if (tagList) {
        tagList.push(item)
      } else {
        this.items.set(tag, [item]);
      }
    }
  }

  getItems(tag: String = World.ALL_ITEMS): Array<Item> {
    return this.items.get(tag);
  }
}
