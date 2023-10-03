"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-student", (0, validateRequest_1.default)(user_validation_1.createUserValidationSchema), user_controller_1.default.createStudent);
router.get("/my-profile/:id", user_controller_1.default.getMyProfile);
router.patch("/:id", (0, validateRequest_1.default)(user_validation_1.updateUserValidationSchema), user_controller_1.default.updateProfile);
exports.default = router;
