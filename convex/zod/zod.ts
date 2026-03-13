import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation, zCustomAction } from "convex-helpers/server/zod4";
import { action, mutation, query } from "../_generated/server";
import { customCtx } from "convex-helpers/server/customFunctions";
import { triggersDB } from "../triggers";
import { Role } from "../user/types/role";
import { getCurrentUser, requireRole } from "../auth/user/functions";

export const zQuery = zCustomQuery(query, NoOp)
export const zMutation = zCustomMutation(mutation, customCtx(triggersDB));
export const zAction = zCustomAction(action, NoOp);

export const zUserQuery = zCustomQuery(query, {
    args: {},
    input: async (ctx, args, opts: { role: Role }) => {
        const currentUser = await getCurrentUser(ctx);
        requireRole(currentUser, opts.role)
        return {
            ctx: { currentUser },
            args
        }
    }
});

export const zUserMutation = zCustomMutation(mutation, {
    args: {},
    input: async (ctx, args, opts: { role: Role }) => {
        const currentUser = await getCurrentUser(ctx);
        requireRole(currentUser, opts.role)
        return {
            ctx: { user: currentUser },
            args
        }
    }
});

export const zUserAction = zCustomAction(action, {
    args: {},
    input: async (ctx, args, opts: { role: Role }) => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const currentUser = await getCurrentUser(ctx as any);
        requireRole(currentUser, opts.role)
        return {
            ctx: { currentUser },
            args
        }
    }
})