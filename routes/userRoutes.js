const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgot_password", authController.forgotPassword);
router.patch("/reset_password/:token", authController.resetPassword);
router.get("/verify-email/:id", authController.emailVerify);
router.patch(
	"/update_password",
	authController.protect,
	authController.updatePassword
);
router.patch("/updateme",authController.protect,userController.UpdateUserProfile,  userController.updateMe);
router.patch("/updateUserContact/:id",authController.protect,userController.UpdateUserProfile,  userController.updateUserContact);

router.patch("/updateuserdegree/:id",authController.protect,userController.UpdateUserProfile,  userController.updateUserDegree);
router.patch("/updateUserExperience/:id",authController.protect,userController.UpdateUserProfile,  userController.updateUserExperience);

router.patch("/updateUserProfile/:id",authController.protect,userController.UpdateUserProfile,  userController.updateUserPhoto);

router.get("/delexp/:index",authController.protect,userController.UpdateUserProfile,  userController.deleteUserExperience);
router.get("/del-education/:index",authController.protect,userController.UpdateUserProfile,  userController.deleteUserDegree);

// router.get("/del-manyuser",authController.protect,  userController.deleteManyUser);



router
	.route("/")
	.get(userController.getAllUser)
	.post(userController.addNewUser);

router
	.route("/:id")
	.get(userController.getOneUser)
	.patch(userController.updateUser)
	// .delete(userController.deleteUser);

module.exports = router;
