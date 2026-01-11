import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/user.controller";
import { body, param } from "express-validator";
import userAuthMiddleware from "../middlewares/userAuth.middleware";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware";

const userRouter = Router();

userRouter.get("/all", adminAuthMiddleware, getAllUsers);
userRouter.get("/:userId", param("userId").isMongoId(), getUserById);
userRouter.put(
    "/update",
    userAuthMiddleware,
    [
        body("realName")
            .optional()
            .trim()
            .isString()
            .isLength({ min: 2, max: 50 })
            .withMessage("Real name must be between 2 and 50 characters"),
        body("qid")
            .optional()
            .isInt({ gt: 20000000, lt: 25999999 })
            .withMessage(
                "QID must be a valid integer between 20000000 and 25999999"
            ),
        body("course")
            .optional()
            .trim()
            .isString()
            .withMessage("Course must be a string"),
        body("branch")
            .optional()
            .trim()
            .isString()
            .withMessage("Branch must be a string"),
    ],
    updateUser
);

export default userRouter;
