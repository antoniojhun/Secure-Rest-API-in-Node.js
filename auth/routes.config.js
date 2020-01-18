const VerifyUserMiddleware = require("./middlewares/verify.user.middleware");
const AuthorisationController = require("./controllers/auth.controller");
const AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");
exports.routesConfig = function(app) {
  // invoke the middleware
  app.post("/auth", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorisationController.login
  ]);

  app.post("/auth/refresh", [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorisationController.login
  ]);
};
