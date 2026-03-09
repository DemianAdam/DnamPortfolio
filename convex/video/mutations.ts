import { getCurrentUser } from "../auth/user/functions";
import { ROLES } from "../user/types/role";
import { zMutation, zUserMutation } from "../zod/zod";
import { createVideoValidator } from "./validators";

export const createVideo = zUserMutation({
    role: ROLES.ADMIN,
    args: createVideoValidator,
    handler: async (ctx, args) => {
        await ctx.db.insert("videos", {
            ...args,
            createdBy: ctx.user._id
        });
    }
});