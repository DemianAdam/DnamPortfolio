import { ErrorDefinition } from "./types"

export const ACCESS_CODE_ERROR_CODE = {
  INVALID: "ACCESS_CODE_INVALID",
  EXPIRED: "ACCESS_CODE_EXPIRED",
  MAXED: "ACCESS_CODE_MAXED"
} as const

export type AccessCodeErrorCode =
  typeof ACCESS_CODE_ERROR_CODE[keyof typeof ACCESS_CODE_ERROR_CODE]


export const ACCESS_CODE_ERRORS = {

  [ACCESS_CODE_ERROR_CODE.INVALID]: {
    status: 400,
    meta: {} as { code: string }
  },

  [ACCESS_CODE_ERROR_CODE.EXPIRED]: {
    status: 400,
    meta: {} as { code: string }
  },

  [ACCESS_CODE_ERROR_CODE.MAXED]: {
    status: 400,
    meta: {} as { code: string }
  }

} as const satisfies Record<AccessCodeErrorCode, ErrorDefinition>