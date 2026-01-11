import { Router } from "express";
import { githubOAuth, googleOAuth } from "../controllers/auth.controller";
import { body, query } from "express-validator";

const authRouter = Router();

authRouter.post(
    "/google",
    body("credential").notEmpty().withMessage("Credential is required"),
    googleOAuth
);
authRouter.get(
    "/github",
    query("code").notEmpty().withMessage("Code is required"),
    githubOAuth
);

export default authRouter;
