import z from "zod"
import { ErrorDefinition } from "./types"

export const VALIDATION_ERROR_CODE = {
    INVALID_BODY: "INVALID_BODY",
} as const

export type ValidationErrorCode = typeof VALIDATION_ERROR_CODE[keyof typeof VALIDATION_ERROR_CODE]

export const VALIDATION_ERRORS = {
    [VALIDATION_ERROR_CODE.INVALID_BODY]: {
        status: 400,
        meta: {} as { issues: z.core.$ZodIssue[] }
    }
} as const satisfies Record<ValidationErrorCode, ErrorDefinition>
