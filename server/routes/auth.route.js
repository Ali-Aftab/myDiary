const { verifySignUp } = require("../middleware");
const { signUp, signIn } = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [verifySignUp.checkDuplicateEmail], signUp);
  app.post("/api/auth/signin", signIn);
};
