import { api } from "@/convex/_generated/api";
import { ROLES } from "@/convex/user/types/role";
import { createVideoValidator } from "@/convex/video/validators";
import { apiHandler } from "@/lib/api/apiHandler";
import { fetchMutation } from "convex/nextjs";

export const POST = apiHandler({
    auth: true,
    role: ROLES.ADMIN,
    body: createVideoValidator
}, async (ctx) => {
    //TODO: Testear em .NET
    const id = await fetchMutation(api.video.mutations.createVideo, {
        ...ctx.body
    },
        {
            token: ctx.session.convexToken
        })

    return id;
});