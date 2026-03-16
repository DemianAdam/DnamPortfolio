import { zid } from "convex-helpers/server/zod4";
import { ROLES } from "../user/types/role";
import { zUserQuery } from "../zod/zod";
import { toVideoDetailsDTO, toVideoListItemDTO } from "./mapper";
import { canUserAccessVideo } from "./utils";
import { videoDetailsValidator, videoListItemValidator } from "./validators";

import { AppError } from "../../lib/errors/AppError"
import { ERROR_CODE } from "../../lib/errors/registry";

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

export const getVideoById = zUserQuery({
    role: [ROLES.STUDENT, ROLES.ADMIN],
    args: {
        id: zid("videos")
    },
    handler: async (ctx, args) => {
        const video = await ctx.db.get("videos", args.id);

        if (!video) {
            throw new AppError(ERROR_CODE.VIDEO.NOT_FOUND, { videoId: args.id });
        }

        if (ctx.currentUser.role === ROLES.ADMIN) {
            return toVideoDetailsDTO(video);
        }

        const canAccess = await canUserAccessVideo(ctx, ctx.currentUser._id, video);

        if (!canAccess) {
            throw new AppError(ERROR_CODE.AUTH.UNAUTHORIZED);
        }

        return toVideoDetailsDTO(video);//TODO: TEST
    },
    returns: videoDetailsValidator
});

export const getR2Key = zUserQuery({
    role: [ROLES.STUDENT, ROLES.ADMIN],
    args: {
        videoId: zid("videos")
    },
    handler: async (ctx, args) => {
        const video = await ctx.db.get("videos", args.videoId);

        if (!video) {
            throw new AppError(ERROR_CODE.VIDEO.NOT_FOUND, { videoId: args.videoId });
        }

        if (ctx.currentUser.role === ROLES.ADMIN) {
            return video.r2Key
        }

        const canAccess = await canUserAccessVideo(ctx, ctx.currentUser._id, video);

        if (!canAccess) {
            throw new AppError(ERROR_CODE.AUTH.UNAUTHORIZED);
        }

        return video.r2Key;

    }
});

/*export const getStudentDashboard = zUserQuery({
    role: ROLES.STUDENT,
    args: {},
    handler: async (ctx) => {
        const now = Date.now();

        // 1️⃣ Get all videos
        const videos = await ctx.db.query("videos").collect();

        // 2️⃣ Determine access
        const videosWithAccess = await Promise.all(
            videos.map(async (video) => {
                const accessible = await canUserAccessVideo(ctx, ctx.currentUser._id, video);
                return { video, accessible };
            })
        );

        // 3️⃣ Stats
        const accessibleVideos = videosWithAccess.filter((v) => v.accessible);

        const sessionsCompleted = accessibleVideos.length;

        const hoursStudied =
            accessibleVideos.reduce((sum, v) => {
                return sum + (v.video.duration ?? 0);
            }, 0) / 60;

        const videosAvailable = accessibleVideos.length;

        const lastSessionVideo = accessibleVideos
            .sort((a, b) => b.video.date - a.video.date)[0];

        const lastSessionDate = lastSessionVideo
            ? lastSessionVideo.video.date
            : null;

        // 4️⃣ Last Session
        const lastSession = lastSessionVideo
            ? {
                _id: lastSessionVideo.video._id,
                title: lastSessionVideo.video.title,
                sessionDate: lastSessionVideo.video.date,
            }
            : null;

        // 5️⃣ Free Classes
        const freeClasses = videos
            .filter((v) => v.freeUntil && v.freeUntil > now)
            .map((v) => ({
                _id: v._id,
                title: v.title,
                freeUntil: v.freeUntil,
            }));

        // 6️⃣ Recent Sessions
        const recentSessions = videosWithAccess
            .sort((a, b) => b.video.date - a.video.date)
            .slice(0, 8)
            .map((v) => ({
                _id: v.video._id,
                title: v.video.title,
                sessionDate: v.video.date,
                accessible: v.accessible,
            }));

        return {
            stats: {
                sessionsCompleted,
                hoursStudied: Math.round(hoursStudied),
                videosAvailable,
                lastSessionDate,
            },

            lastSession,

            freeClasses,

            recentSessions,
        };
    },
});*/