import { api } from "@/convex/_generated/api";
import { ROLES } from "@/convex/user/types/role";
import { createdVideoValidator, createVideoValidator } from "@/convex/video/validators";
import { apiHandler } from "@/lib/api/apiHandler";


export const POST = apiHandler({
    auth: true,
    role: ROLES.ADMIN,
    body: createVideoValidator,
    return: createdVideoValidator
}, async (ctx) => {
    const createdVideo = await ctx.convex.mutation(api.video.mutations.createVideo, {
        ...ctx.body
    });
   
    return createdVideo;
});
