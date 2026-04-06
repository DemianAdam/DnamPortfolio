import { zid } from "convex-helpers/server/zod4";
import z from "zod";
import { simpleUserValidator, userIdValidator } from "../user/validators";


const assignedUsersValidator = z.array(simpleUserValidator.pick({ id: true }));

export const videoValidator = z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.number(),
    isFree: z.boolean(),
    freeUntil: z.number().optional(),
    createdBy: userIdValidator,
    publishDate: z.number(),
    deleted: z.boolean().default(false),
    secret: z.string()
});


export const createVideoValidator = videoValidator.omit({
    createdBy: true,
    secret: true
}).extend({
    assignedUsers: assignedUsersValidator.optional()
});

export const createdVideoValidator = videoValidator
    .extend({
        id: zid("videos"),
        description: z.string().nullable(),
        freeUntil: z.number().nullable(),
        assignedUsers: assignedUsersValidator.nullable()
    })


export const deleteVideoValidator = z.object({
    videoId: zid("videos")
});





export const updateVideoValidator = videoValidator
    .omit({
        createdBy: true,
        duration: true,
        secret: true,
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
