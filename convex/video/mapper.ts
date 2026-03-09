import { Doc } from "../_generated/dataModel";
import { VideoListItemDTO } from "./dtos";

export function toVideoListItemDTO(video: Doc<"videos">): VideoListItemDTO {
    return {
        id: video._id,
        title: video.title,
        duration: video.duration,
        date: video.date,
        isFree: video.isFree,
        freeUntil: video.freeUntil
    };
}