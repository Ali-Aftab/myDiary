const {
  postNewEntry,
  listAllUserEntry,
  listAllSenForOneEntry,
} = require("../controllers/entry.controller");

describe("Post new Entry!", () => {
  describe("save to db", () => {
    it("should get data", () => {
      const req = {};
      const res = {};
      let dataNull = null;
      res.json = (data) => {
        console.log(data);
        dataNull = data;
      };
      postNewEntry(req, res, next);
      if (dataNull === null) {
        throw new Error("data was null");
      }
    });
  });
});
