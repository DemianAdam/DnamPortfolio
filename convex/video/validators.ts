import { zid } from "convex-helpers/server/zod4";
import z from "zod";
import { simpleUserValidator } from "../user/validators";

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

export const createVideoValidator = videoValidator.omit({
    createdBy: true
}).extend({
    assignedUsers: z.array(simpleUserValidator).optional()
});


export const updateVideoValidator = videoValidator
    .omit({
        createdBy: true,
        r2Key: true,
        duration: true
    })
    .partial();

export const videoListItemValidator = videoValidator.pick({
    title: true,
    duration: true,
    date: true,
    isFree: true,
    freeUntil: true
}).extend({
    id: zid("videos")
});

export const videoDetailsValidator = videoValidator.pick({
    title: true,
    description: true,
    duration: true,
    date: true,
    isFree: true,
    freeUntil: true
}).extend({
    id: zid("videos")
});
