import { Doc } from "../_generated/dataModel";
import { VideoDetailsDTO, VideoListItemDTO } from "./dtos";

export function toVideoListItemDTO(video: Doc<"videos">): VideoListItemDTO {
    const now = Date.now();
    return {
        id: video._id,
        title: video.title,
        duration: video.duration,
        publishDate: video.publishDate,
        isFree: video.isFree,
        freeUntil: video.freeUntil,
        isExpired: video.freeUntil !== undefined && video.freeUntil < now
    };
}

export function toVideoDetailsDTO(video: Doc<"videos">): VideoDetailsDTO {
    return {
        id: video._id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        publishDate: video.publishDate,
        isFree: video.isFree
    }
}