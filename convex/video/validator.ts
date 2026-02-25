import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const videoValidator = z.object({
    title: z.string(),
    description: z.string(),
    r2Key: z.string(),
    duration: z.number(),
    isFree: z.boolean(),
    freeUntil: z.number().optional(),
    createdBy: zid("users"),
    date: z.number()
});