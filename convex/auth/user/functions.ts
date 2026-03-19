import { Doc } from "../../_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, QueryCtx } from "../../_generated/server";
import { Role, ROLES } from "../../user/types/role";
import { AppError } from "../../../lib/errors/AppError";
import { ERROR_CODE } from "../../../lib/errors/registry";
import { AdminUser, User } from "../../user/types/user";
import { GenericId } from "convex/values";
import { UserIdentity } from "convex/server";

export const TOKEN_SUB_CLAIM_DIVIDER = "|";

export async function getCurrentUser(ctx: QueryCtx | MutationCtx): Promise<User | AdminUser> {
    const identity = await ctx.auth.getUserIdentity();
    console.log("IDENTITY:", identity);

    if (!identity) {
        throw new AppError(ERROR_CODE.AUTH.UNAUTHENTICATED);
    }

    return await getUserFromIdentity(identity, ctx);
}

async function getUserFromIdentity(identity: UserIdentity, ctx: QueryCtx | MutationCtx): Promise<User | AdminUser> {
    if (identity.subject == "admin-service") {
        if (!identity.adminId) {
            throw new AppError(ERROR_CODE.AUTH.UNAUTHENTICATED);
        }
        const adminUser: AdminUser = {
            _id: identity.adminId.toString(),
            role: ROLES.ADMIN
        }
        console.log("ADMIN USER:", adminUser);
        return adminUser;
    }

    const userId = getUserIdFromIdentity(identity);
    const user = await ctx.db.get("users", userId);
    if (!user) {
        throw new AppError(ERROR_CODE.USER.NOT_FOUND);
    }
    console.log("CONVEX USER", user);
    return user;
}

function getUserIdFromIdentity(identity: UserIdentity) {
    const [userId] = identity.subject.split(TOKEN_SUB_CLAIM_DIVIDER);
    return userId as GenericId<"users">;
}

export function requireRole(
    user: User | AdminUser,
    role: Role | Role[]) {
    if (user.role == ROLES.ADMIN) {
        return true;
    }
    if (Array.isArray(role)) {
        if (!role.includes(user.role)) {
            throw new AppError(ERROR_CODE.AUTH.UNAUTHORIZED);
        }
    }
    else if (user.role !== role) {
        throw new AppError(ERROR_CODE.AUTH.UNAUTHORIZED);
    }
}
