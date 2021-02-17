const {
  searchEntries,
  searchSentences,
  detectAverageMood,
} = require("../controllers/analyze.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/analyze/search/entries/", [authJwt.verifyToken], searchEntries);
  app.get(
    "/api/analyze/search/sentences/",
    [authJwt.verifyToken],
    searchSentences
  );

  app.get("/api/analyze/averagemood", [authJwt.verifyToken], detectAverageMood);
};
