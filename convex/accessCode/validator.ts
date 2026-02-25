import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const accessCodeValidator = z.object({
    code: z.string(),
    videoId: zid("videos"),
    expiresAt: z.iso.date().optional(),
    maxUses: z.number(),
    usedCount: z.number(),
    createdBy: zid("users")
});