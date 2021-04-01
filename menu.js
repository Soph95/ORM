const db = require("./db");
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
  addItem(name) {
    const item = new MenuItem(name, 6.99, this.id, 1);
    this.items.push(item);
  }
}
module.exports = Menu;
