export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._items = items;
    }


    //this section is what builds the inital card list
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item)
            }); 
        }

    addItems(element) {
        this._container.prepend(element);
        }
    }