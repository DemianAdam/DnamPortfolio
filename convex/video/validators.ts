import { zid } from "convex-helpers/server/zod4";
import z from "zod";
import { simpleUserValidator, userIdValidator } from "../user/validators";

export const videoValidator = z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.number(),
    isFree: z.boolean(),
    freeUntil: z.number().optional(),
    createdBy: userIdValidator,
    publishDate: z.number()
});

export const createVideoValidator = videoValidator.omit({
    createdBy: true
}).extend({
    assignedUsers: z.array(simpleUserValidator.pick({ id: true })).optional()
});


export const updateVideoValidator = videoValidator
    .omit({
        createdBy: true,
        duration: true
    })
    .partial();

export const videoListItemValidator = videoValidator.pick({
    title: true,
    duration: true,
    publishDate: true,
    isFree: true,
    freeUntil: true
}).extend({
    id: zid("videos"),
    isExpired: z.boolean()
});

export const videoDetailsValidator = videoValidator.pick({
    title: true,
    description: true,
    duration: true,
    publishDate: true,
    isFree: true,
    freeUntil: true
}).extend({
    id: zid("videos")
});
