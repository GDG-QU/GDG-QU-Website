import { Schema, model } from "mongoose";
import type { TeamMember } from "../types/TeamMember.interface";

const TeamMemberSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        role: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        photoUrl: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 500,
        },
        linkedinUrl: {
            type: String,
            trim: true,
        },
        githubUrl: {
            type: String,
            trim: true,
        },
        twitterUrl: {
            type: String,
            trim: true,
        },
        instagramUrl: {
            type: String,
            trim: true,
        },
        badge: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export default model<TeamMember>("TeamMember", TeamMemberSchema);
