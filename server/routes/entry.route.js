const {
  postNewEntry,
  listAllUserEntry,
  listAllSenForOneEntry,
} = require("../controllers/entry.controller");
const { authJwt, sendEntryToIBM } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/entry/newEntry",
    [authJwt.verifyToken],
    sendEntryToIBM,
    postNewEntry
  );

  app.get("/api/entry/listAll", [authJwt.verifyToken], listAllUserEntry);
  app.get(
    "/api/entry/sentencetone/:entryToneId",
    [authJwt.verifyToken],
    listAllSenForOneEntry
  );
};
