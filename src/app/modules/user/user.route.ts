import express from "express";
import controller from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
    createUserValidationSchema,
    updateUserValidationSchema,
} from "./user.validation";

const router = express.Router();

router.post(
    "/create-student",
    validateRequest(createUserValidationSchema),
    controller.createStudent
);
router.get("/my-profile/:id", controller.getMyProfile);

router.patch(
    "/:id",
    validateRequest(updateUserValidationSchema),
    controller.updateProfile
);

export default router;
