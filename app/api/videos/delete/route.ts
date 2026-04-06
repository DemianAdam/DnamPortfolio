import { api } from "@/convex/_generated/api";
import { ROLES } from "@/convex/user/types/role";
import { deleteVideoValidator } from "@/convex/video/validators";
import { apiHandler } from "@/lib/api/apiHandler";

export const POST = apiHandler({
  auth: true,
  role: ROLES.ADMIN,
  body: deleteVideoValidator,
}, async (ctx) => {
  await ctx.convex.mutation(api.video.mutations.deleteVideo, {
    videoId: ctx.body.videoId
  });
});