const db = require("./db");

class MenuItem {
  constructor(name, price, menu_id, id) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.menu_id = menu_id;
  }

  save(cb) {
    db.run(
      "INSERT INTO MenuItem(name, price, menu_id) VALUES(?, ?, ?)",
      [this.name, this.price, this.menu_id],
      cb
    );
  }
}

module.exports = MenuItem;
