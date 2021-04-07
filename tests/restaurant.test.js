const db = require("../db");
const Menu = require("../src/menu");
const Restaurant = require("../src/restaurant");

describe("Basic restaurant tests", () => {
  beforeAll((done) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS Restaurant(id INTEGER PRIMARY KEY, name TEXT, image TEXT)",
      done
    );
  });
  test("can save restaurant data", (done) => {
    const restaurant = new Restaurant(
      "Spice Merchant",
      "www.unsplash/jkalsjdka"
    );
    restaurant.save(() => {
      db.get(
        "SELECT * FROM Restaurant WHERE name=?",
        "Spice Merchant",
        (err, row) => {
          expect(row.image).toEqual("www.unsplash/jkalsjdka");
          expect(row.id).toEqual(1);
          done();
        }
      );
    });
  });
  test("can create an instance of a restaurant from a row", (done) => {
    db.get("SELECT * FROM Restaurant WHERE id=?", 1, (err, row) => {
      const restaurant = new Restaurant(row.name, row.image, row.id);
      expect(restaurant.name).toEqual("Spice Merchant");
      expect(restaurant.image).toEqual("www.unsplash/jkalsjdka");
      expect(restaurant.id).toEqual(1);
      db.get("SELECT COUNT(id) AS total FROM Restaurant;", (err, count) => {
        expect(count.total).toEqual(1);
        done();
      });
    });
  });
});

//Needs completing
describe("Menus", () => {
  test("Can add menus to restaurant", () => {
    const redDragon = new Restaurant("Red Dragon", "www.image.com", 1);
    redDragon.addMenu("Mains");
    expect(redDragon.menus[0].title).toEqual("Mains");
  });
});
