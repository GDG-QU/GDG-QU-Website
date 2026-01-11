import { Document } from "mongoose";

export interface IWallOfFame extends Document {
    name: string;
    achievement: string;
    track: string;
    highlight?: string;
    quote?: string;
    badges: string[];
    year: number;
}
