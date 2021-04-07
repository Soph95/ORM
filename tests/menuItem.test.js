const db = require("../db");
const MenuItem = require("../src/menuItem");
const Menu = require("../src/menu");

describe("Items", () => {
  beforeAll((done) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS MenuItem(id INTEGER PRIMARY KEY, name TEXT, price REAL, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES Menu(id))",
      done
    );
  });
  test("can save item in data", (done) => {
    const item = new MenuItem("Chicken Curry", 6.99, 1);
    item.save(() => {
      db.get(
        "SELECT * FROM MenuItem WHERE name=?",
        "Chicken Curry",
        (err, row) => {
          expect(row.name).toEqual("Chicken Curry");
          expect(row.id).toEqual(1);
          expect(row.menu_id).toEqual(1);
          done();
        }
      );
    });
  });
  test("can create an instance of a item from a row", (done) => {
    db.get("SELECT * FROM MenuItem WHERE id=?", 1, (err, row) => {
      const item = new MenuItem(row.name, row.price, row.menu_id, row.id);
      expect(item.name).toEqual("Chicken Curry");
      expect(item.price).toEqual(6.99);
      expect(item.menu_id).toEqual(1);
      expect(item.id).toEqual(1);
      db.get("SELECT COUNT(id) AS total FROM MenuItem;", (err, count) => {
        expect(count.total).toEqual(1);
        done();
      });
    });
  });
});

describe("Items", () => {
  test("Can add items to menus", () => {
    const Mains = new Menu("Mains", 1, 1);
    Mains.addItem("Pie and Mash", 6.99, 1);
    expect(Mains.items[0].name).toEqual("Pie and Mash");
    expect(Mains.items[0].price).toEqual(6.99);
  });
});
