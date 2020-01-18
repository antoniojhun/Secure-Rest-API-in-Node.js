const UsersController = require("./controllers/users.controller");
const PermissionMiddleware = require("../common/middlewares/auth.permission.middleware");
const ValidationMiddleware = require("../common/middlewares/auth.validation.middleware");
const config = require("../common/config/env.config");

const ADMIN = config.permissionLevels.ADMIN;
const PREMIUM = config.permissionLevels.PREMIUM_USER;
const FREE = config.permissionLevels.FREE_USER;

exports.routesConfig = function(app) {
  //create a user
  app.post("/users", [UsersController.insert]);

  //check if the user exists in Premium
  app.get("/users", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PREMIUM),
    UsersController.list
  ]);

  //check if the user exists: get user by id (search all)
  app.get("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.getById
  ]);

  //update user by id
  app.patch("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.patchById
  ]);

  //delete user by id (only admin can delete)
  app.delete("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UsersController.removeById
  ]);
};
