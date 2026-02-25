import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const videoAccessValidator = z.object({
    videoId: zid("videos"),
    userId: zid("users"),
    grantedBy: zid("users"),
    grantedAt: z.number(),
    expiresAt: z.number().optional()
});