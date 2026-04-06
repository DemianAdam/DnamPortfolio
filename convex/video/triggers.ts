import { AppError } from "../../lib/errors/AppError";
import { ERROR_CODE } from "../../lib/errors/registry";
import { COUNTER_KEYS, getCounter } from "../counter";
import { subscribeTrigger } from "../triggers";

const counter = getCounter(COUNTER_KEYS.totalVideos);

subscribeTrigger("videos", {
    insert: async (ctx) => {
        counter.inc(ctx);
    },

    delete: async (ctx, { oldDoc }) => {
        console.log("VIDEO DELETED TRIGGER")
        if (oldDoc.deleted) {
            throw new AppError(ERROR_CODE.VIDEO.ALREADY_DELETED, {
                videoId: oldDoc._id,
            });
        }

        counter.dec(ctx);
    },

    update: async (_, { oldDoc }) => {
        if (oldDoc.deleted) {
            throw new AppError(ERROR_CODE.VIDEO.ALREADY_DELETED, {
                videoId: oldDoc._id,
            });
        }
    },
});