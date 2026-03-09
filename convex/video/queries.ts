import { ROLES } from "../user/types/role";
import { zUserQuery } from "../zod/zod";
import { toVideoListItemDTO } from "./mapper";
import { videoListItemValidator } from "./validators";

export const listVideos = zUserQuery({
    role: ROLES.ADMIN,
    args: {},
    handler: async (ctx) => {
        const videos = await ctx.db
            .query("videos")
            .order("desc")
            .collect();

        return videos.map(toVideoListItemDTO);
    },
    returns: videoListItemValidator.array()
});