import { Doc } from "../../_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, QueryCtx } from "../../_generated/server";
import { Role } from "../../user/types/Role";
import { AppError } from "../../../lib/errors/AppError";
import { ERROR_CODE } from "../../../lib/errors/registry";

export async function getCurrentUser(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
        throw new AppError(ERROR_CODE.AUTH.UNAUTHENTICATED);
    }
    const user = await ctx.db.get("users", userId);
    if (!user) {
        throw new AppError(ERROR_CODE.USER.NOT_FOUND);
    }

    return user;
}

export function isRole(
    user: Doc<"users">,
    role: Role
): boolean {
    return user.role === role;
};

export function requireRole(
    user: Doc<"users">,
    role: Role) {
    if (!isRole(user, role)) {
        throw new AppError(ERROR_CODE.AUTH.UNAUTHORIZED);
    }
}
