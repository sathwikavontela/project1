import Router from "express";
import { createAccount, getAllUsers, loginUser, logoutUser } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/user.middleware.js";

const router = Router();
router.route('/create-user').post(createAccount);
router.route('/login-user').post(loginUser);
router.route('/userDetails').get(verifyJwt, getAllUsers);
router.route('/logout').post(verifyJwt,logoutUser);

export default router