import { ErrorDefinition } from "./types"

export const AUTH_ERROR_CODE = {
  UNAUTHENTICATED: "AUTH_UNAUTHENTICATED",
  UNAUTHORIZED: "AUTH_UNAUTHORIZED"
} as const

export type AuthErrorCode =
  typeof AUTH_ERROR_CODE[keyof typeof AUTH_ERROR_CODE]

export const AUTH_ERRORS = {

  [AUTH_ERROR_CODE.UNAUTHENTICATED]: {
    status: 401
  },

  [AUTH_ERROR_CODE.UNAUTHORIZED]: {
    status: 403
  }

} as const satisfies Record<AuthErrorCode, ErrorDefinition>