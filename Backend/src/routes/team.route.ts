import { Router } from "express";
import {
    createTeamMember,
    deleteTeamMember,
    getTeamMemberById,
    getTeamMembers,
    updateTeamMember,
} from "../controllers/team.controller";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware";
import { body, param } from "express-validator";

const teamRouter = Router();

teamRouter.get("/", getTeamMembers);
teamRouter.get("/:id", param("id").exists().isMongoId(), getTeamMemberById);

// ADMIN ONLY ROUTES
teamRouter.use(adminAuthMiddleware);
teamRouter.post(
    "/create",
    [
        body("name").exists().isString().trim().isLength({ min: 2, max: 50 }),
        body("role").exists().isString().trim().isLength({ min: 2, max: 100 }),
        body("bio").exists().isString().trim().isLength({ min: 10, max: 500 }),
        body("photoUrl").optional().isURL(),
        body("linkedinUrl").optional().isURL(),
        body("githubUrl").optional().isURL(),
        body("twitterUrl").optional().isURL(),
        body("instagramUrl").optional().isURL(),
        body("badge").optional().isString(),
    ],
    createTeamMember
);
teamRouter.put(
    "/:id",
    [
        param("id").exists().isMongoId(),
        body("name").optional().isString().trim().isLength({ min: 2, max: 50 }),
        body("role")
            .optional()
            .isString()
            .trim()
            .isLength({ min: 2, max: 100 }),
        body("bio")
            .optional()
            .isString()
            .trim()
            .isLength({ min: 10, max: 500 }),
        body("photoUrl").optional().isURL(),
        body("linkedinUrl").optional().isURL(),
        body("githubUrl").optional().isURL(),
        body("twitterUrl").optional().isURL(),
        body("instagramUrl").optional().isURL(),
        body("badge").optional().isString(),
    ],
    updateTeamMember
);
teamRouter.delete("/:id", param("id").exists().isMongoId(), deleteTeamMember);

export default teamRouter;
