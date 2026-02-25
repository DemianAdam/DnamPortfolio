import { COUNTER_KEYS, getCounter } from "../counter";
import { InsertOperation, subscribeTrigger, DeleteOperation } from "../triggers";
const counter = getCounter(COUNTER_KEYS.totalVideos);

const onInsertVideo: InsertOperation = async (ctx) => {
    counter.inc(ctx);
}

const onDeleteVideo: DeleteOperation = async (ctx) => {
    counter.dec(ctx);
}


subscribeTrigger("videos", {
    insert: onInsertVideo,
    delete: onDeleteVideo,
    /*onUpdate: onUpdateVideo*/
});