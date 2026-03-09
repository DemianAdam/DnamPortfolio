import { Doc } from "../../_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, QueryCtx } from "../../_generated/server";
import { Role } from "../../user/types/role";
import { ConvexError } from "convex/values";

export async function getCurrentUser(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
        throw new Error("Not signed in");
    }
    const user = await ctx.db.get("users", userId);
    if (!user) {
        throw new Error("User record not found");
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
        throw new ConvexError("Unauthorized");
    }
}
