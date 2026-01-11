import { Schema, model } from "mongoose";
import type { IWallOfFame } from "../types/WallOfFame.interface";

const WallOfFameSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        achievement: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 500,
        },
        track: {
            type: String,
            required: true,
            trim: true,
        },
        highlight: {
            type: String,
            trim: true,
            maxlength: 200,
        },
        quote: {
            type: String,
            trim: true,
            maxlength: 300,
        },
        badges: {
            type: [String],
            default: [],
        },
        year: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const WallOfFameModel = model<IWallOfFame>("WallOfFame", WallOfFameSchema);

export default WallOfFameModel;
