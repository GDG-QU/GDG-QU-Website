import type { Document } from "mongoose";

export interface TeamMember extends Document {
    name: string;
    role: string;
    photoUrl: string;
    bio: string;
    linkedinUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    badge?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
