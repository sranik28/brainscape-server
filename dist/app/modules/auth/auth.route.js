"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router.post("/login", auth_controller_1.default.loginUser);
router.post("/refresh-token", auth_controller_1.default.refreshToken);
exports.default = router;
