import { api } from "@/convex/_generated/api";
import { ROLES } from "@/convex/user/types/role";
import { createVideoValidator } from "@/convex/video/validators";
import { apiHandler } from "@/lib/api/apiHandler";
import { AppError } from "@/lib/errors/AppError";
import { ERROR_CODE } from "@/lib/errors/registry";
import { zid } from "convex-helpers/server/zod4";

const createVideoReturn = zid("videos");

export const POST = apiHandler({
    auth: true,
    role: ROLES.ADMIN,
    body: createVideoValidator,
    return: createVideoReturn
}, async (ctx) => {

    throw new AppError(ERROR_CODE.VIDEO.NOT_FOUND,{videoId:"123"})
    const id = await ctx.convex.mutation(api.video.mutations.createVideo, {
        ...ctx.body
    });
   
    return id;
});
