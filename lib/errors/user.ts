import { ErrorDefinition } from "./types"

export const USER_ERROR_CODE = {
    NOT_FOUND: "USER_NOT_FOUND",
} as const

export type UserErrorCode = typeof USER_ERROR_CODE[keyof typeof USER_ERROR_CODE]

export const USER_ERRORS = {
    [USER_ERROR_CODE.NOT_FOUND]: {
        status: 404,
        meta: {} as { userId: string }
    }
} as const satisfies Record<UserErrorCode, ErrorDefinition>
