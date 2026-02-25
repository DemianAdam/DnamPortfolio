import { zMutation } from "../zod/zod";
import { videoValidator } from "./validator";

export const createVideo = zMutation({
    args: videoValidator,
    handler: async (ctx, args) => {

    }
});