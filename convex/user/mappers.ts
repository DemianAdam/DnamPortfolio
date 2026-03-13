import { SimpleUserDTO } from "./dtos";
import { CompletedUser } from "./types/user";

export function toSimpleUserDTO(user: CompletedUser): SimpleUserDTO {
    return {
        id: user._id,
        email: user.email,
        name: user.name
    }
}