export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items = this._items) {
    const itemsToRender = Array.isArray(items) ? items : [];
    this._items = itemsToRender;

    this._container.innerHTML = "";

    itemsToRender.forEach((item) => {
      const element = this._renderer(item);
      if (element) {
        this._container.append(element);
      }
    });
  }

  addItem(element) {
    if (!element) {
      return;
    }
    this._container.prepend(element);
  }
}
