import { ACCESS_CODE_ERROR_CODE, ACCESS_CODE_ERRORS } from "./accessCode";
import { AUTH_ERROR_CODE, AUTH_ERRORS } from "./auth";
import { VIDEO_ERROR_CODE, VIDEO_ERRORS } from "./video";


export const ERROR_CODE = {
  AUTH: AUTH_ERROR_CODE,
  VIDEO: VIDEO_ERROR_CODE,
  ACCESS_CODE: ACCESS_CODE_ERROR_CODE
} as const

export const ERROR_REGISTRY = {
  ...AUTH_ERRORS,
  ...VIDEO_ERRORS,
  ...ACCESS_CODE_ERRORS
} as const

export type ErrorCode = keyof typeof ERROR_REGISTRY

type ExtractMeta<T> =
  T extends { meta: infer M }
    ? M
    : undefined

export type ErrorMeta<T extends ErrorCode> =
  ExtractMeta<(typeof ERROR_REGISTRY)[T]>