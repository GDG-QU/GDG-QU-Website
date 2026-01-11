import { Router } from "express";
import {
    getWallOfFameEntries,
    addWallOfFameEntry,
    deleteWallOfFameEntry,
    updateWallOfFameEntry,
} from "../controllers/wallOfFame.controller";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware";
import { body } from "express-validator";

const wallOfFameRouter = Router();

wallOfFameRouter.get("/", getWallOfFameEntries);

wallOfFameRouter.use(adminAuthMiddleware);
wallOfFameRouter.post(
    "/",
    [
        body("name").isString().notEmpty().isLength({ min: 2, max: 50 }),
        body("achievement")
            .isString()
            .notEmpty()
            .isLength({ min: 10, max: 500 }),
        body("track").isString().notEmpty(),
        body("highlight").optional().isString().isLength({ max: 200 }),
        body("quote").optional().isString().isLength({ max: 300 }),
        body("badges").optional().isArray(),
        body("year").isInt({ min: 1900, max: new Date().getFullYear() }),
    ],
    addWallOfFameEntry
);
wallOfFameRouter.put(
    "/:id",
    [
        body("name")
            .optional()
            .isString()
            .notEmpty()
            .isLength({ min: 2, max: 50 }),
        body("achievement")
            .optional()
            .isString()
            .notEmpty()
            .isLength({ min: 10, max: 500 }),
        body("track").optional().isString().notEmpty(),
        body("highlight").optional().isString().isLength({ max: 200 }),
        body("quote").optional().isString().isLength({ max: 300 }),
        body("badges").optional().isArray(),
        body("year")
            .optional()
            .isInt({ min: 1900, max: new Date().getFullYear() }),
    ],
    updateWallOfFameEntry
);
wallOfFameRouter.delete("/:id", deleteWallOfFameEntry);

export default wallOfFameRouter;
