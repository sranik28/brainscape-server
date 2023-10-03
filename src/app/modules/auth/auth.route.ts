import express from "express";
import controller from "./auth.controller";

const router = express.Router();

router.post("/login", controller.loginUser);
router.post("/refresh-token", controller.refreshToken);

export default router;
