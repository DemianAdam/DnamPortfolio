import { v } from "convex/values";
import { mutation, query } from "../_generated/server"
import { zCustomQuery, zCustomMutation } from "convex-helpers/server/zod4";


export const adapterQuery = zCustomQuery(query, {
    args: { secret: v.string() },
    input: async (_ctx, { secret }) => {
        checkSecret(secret);
        return { ctx: {}, args: {} };
    },
});

export const adapterMutation = zCustomMutation(mutation, {
    args: { secret: v.string() },
    input: async (_ctx, { secret }) => {
        checkSecret(secret);
        return { ctx: {}, args: {} };
    },
});

function checkSecret(secret: string) {
    if (process.env.CONVEX_AUTH_ADAPTER_SECRET === undefined) {
        throw new Error(
            "Missing CONVEX_AUTH_ADAPTER_SECRET Convex environment variable",
        );
    }
    if (secret !== process.env.CONVEX_AUTH_ADAPTER_SECRET) {
        throw new Error("Adapter API called without correct secret value");
    }
}