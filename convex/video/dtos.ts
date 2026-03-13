import { z } from "zod";
import { createVideoValidator, updateVideoValidator, videoDetailsValidator, videoListItemValidator } from "./validators";

export type CreateVideoDTO = z.infer<typeof createVideoValidator>;

export type UpdateVideoDTO = z.infer<typeof updateVideoValidator>;

export type VideoListItemDTO = z.infer<typeof videoListItemValidator>;

export type VideoDetailsDTO = z.infer<typeof videoDetailsValidator>;