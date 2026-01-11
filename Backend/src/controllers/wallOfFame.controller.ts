import { validationResult } from "express-validator";
import WallOfFame from "../models/WallOfFame.model";
import { asyncHandler } from "../utils/asyncHandler";
import type { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const getWallOfFameEntries = asyncHandler(
    async (req: Request, res: Response) => {
        const entries = await WallOfFame.find().sort({ createdAt: -1 });
        res.sendResponse(
            200,
            "Wall of Fame entries fetched successfully",
            entries
        );
    }
);

export const addWallOfFameEntry = asyncHandler(
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(400, JSON.stringify(errors.array()));
        }

        const { name, achievement, track, highlight, quote, badges, year } =
            req.body;

        const newEntry = await WallOfFame.create({
            name,
            achievement,
            track,
            highlight,
            quote,
            badges,
            year,
        });
        if (!newEntry) {
            throw new ApiError(500, "Failed to add Wall of Fame entry");
        }

        res.sendResponse(
            201,
            "Wall of Fame entry added successfully",
            newEntry
        );
    }
);

export const updateWallOfFameEntry = asyncHandler(
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(400, JSON.stringify(errors.array()));
        }
        const { id } = req.params;

        const updatableFields = [
            "name",
            "achievement",
            "track",
            "highlight",
            "quote",
            "badges",
            "year",
        ];

        const updateData: any = {};
        updatableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const updatedEntry = await WallOfFame.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedEntry) {
            throw new ApiError(404, "Wall of Fame entry not found");
        }

        res.sendResponse(
            200,
            "Wall of Fame entry updated successfully",
            updatedEntry
        );
    }
);

export const deleteWallOfFameEntry = asyncHandler(
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(400, JSON.stringify(errors.array()));
        }
        const { id } = req.params;

        const deletedEntry = await WallOfFame.findByIdAndDelete(id);
        if (!deletedEntry) {
            throw new ApiError(404, "Wall of Fame entry not found");
        }

        res.sendResponse(
            200,
            "Wall of Fame entry deleted successfully",
            deletedEntry
        );
    }
);
