import { zUserQuery } from "../zod/zod";
import { toSimpleUserDTO } from "./mappers";
import { ROLES } from "./types/role";
import { CompletedUser } from "./types/user";
import { simpleUserValidator } from "./validators";

export const listUsersForAssignment = zUserQuery({
    role: ROLES.ADMIN,
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db
            .query("users")
            .withIndex("index_byRole_byCompleted", q => q.eq("role", "student").eq("completed", true))
            .collect() as CompletedUser[];

        return users.map(toSimpleUserDTO);
    },
    returns: simpleUserValidator.array()
});