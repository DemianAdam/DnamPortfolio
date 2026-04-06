import { customMutation, NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation, zCustomAction } from "convex-helpers/server/zod4";
import { action as rawAction, mutation as rawMutation, query as rawQuery } from "../_generated/server";
import { customCtx } from "convex-helpers/server/customFunctions";
import { triggersDB } from "../triggers";
import { Role } from "../user/types/role";
import { getCurrentUser, requireRole } from "../auth/user/functions";

export const query = zCustomQuery(rawQuery, NoOp);
export const mutation = customMutation(rawMutation, customCtx(triggersDB));
export const action = zCustomAction(rawAction, NoOp);

export const zUserQuery = zCustomQuery(rawQuery, {
    args: {},
    input: async (ctx, args, opts: { role: Role | Role[] }) => {
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

export const zUserAction = zCustomAction(rawAction, {
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

/*export const nulldefined = <T extends z.ZodTypeAny>(schema: T) =>
  schema
    .nullable()
    .transform((v) => (v === null ? undefined : v))
    .optional();*/