const db = require("../db");
const MenuItem = require("./menuItem");

class Menu {
  constructor(title, restaurant_id, id) {
    this.title = title;
    this.restaurant_id = restaurant_id;
    this.id = id;
    this.items = [];
  }

  save(cb) {
    db.run(
      "INSERT INTO Menu(title, restaurant_id) VALUES(?, ?)",
      [this.title, this.restaurant_id],
      cb
    );
  }
  addItem(name, price, id, cb) {
    const item = new MenuItem(name, price, this.id, id);
    this.items.push(item);
    item.save();
  }
}
module.exports = Menu;
