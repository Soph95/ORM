const db = require("../db");
const Menu = require("../src/menu");

describe("Menus", () => {
  beforeAll((done) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS Menu(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER, FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id))",
      done
    );
  });
  test("can save menu data", (done) => {
    const menu1 = new Menu("Mains", 1);
    menu1.save(() => {
      db.get("SELECT * FROM Menu WHERE title=?", "Mains", (err, row) => {
        expect(row.title).toEqual("Mains");
        expect(row.id).toEqual(1);
        done();
      });
    });
  });
  test("can create an instance of a menu from a row", (done) => {
    db.get("SELECT * FROM Menu WHERE id=?", 1, (err, row) => {
      const menu1 = new Menu(row.title, row.restaurant_id, row.id);
      expect(menu1.id).toEqual(1);
      expect(menu1.title).toEqual("Mains");
      expect(menu1.restaurant_id).toEqual(1);
      db.get("SELECT COUNT(id) AS total FROM Menu;", (err, count) => {
        expect(count.total).toEqual(1);
        done();
      });
    });
  });
});
