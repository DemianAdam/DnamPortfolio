import { ConvexError } from "convex/values";
import { Doc } from "../_generated/dataModel";
import { SimpleUserDTO } from "./dtos";

export function toSimpleUserDTO(user: Doc<"users">): SimpleUserDTO {
    if (!user.completed) {
        throw new ConvexError("SimpleUser must have name.");
    }

    return {
        id: user._id,
        email: user.email,
        name: user.name
    }
}