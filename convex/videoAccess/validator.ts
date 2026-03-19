import { zid } from "convex-helpers/server/zod4";
import z from "zod";
import { userIdValidator } from "../user/validators";

export const videoAccessValidator = z.object({
    videoId: zid("videos"),
    userId: zid("users"),
    grantedBy: userIdValidator,
    grantedAt: z.number(),
    expiresAt: z.number().optional()
});