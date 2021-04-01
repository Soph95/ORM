const db = require("./db");
const Menu = require("./menu");

class Restaurant {
  constructor(name, image, id) {
    this.name = name;
    this.image = image;
    this.id = id;
    this.menus = [];
  }

  save(cb) {
    db.run(
      "INSERT INTO Restaurant(name, image) VALUES(?, ?)",
      [this.name, this.image],
      cb
    );
  }
  addMenu(title) {
    const menu1 = new Menu(title, this.id, 1);
    this.menus.push(menu1);
    //console.log(this.menus);
  }
}

module.exports = Restaurant;
