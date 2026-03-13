import { ErrorDefinition } from "./types"

export const VIDEO_ERROR_CODE = {
  NOT_FOUND: "VIDEO_NOT_FOUND",
  ACCESS_DENIED: "VIDEO_ACCESS_DENIED"
} as const

export type VideoErrorCode =
  typeof VIDEO_ERROR_CODE[keyof typeof VIDEO_ERROR_CODE]

export const VIDEO_ERRORS = {

  [VIDEO_ERROR_CODE.NOT_FOUND]: {
    status: 404,
    meta: {} as { videoId: string }
  },

  [VIDEO_ERROR_CODE.ACCESS_DENIED]: {
    status: 403,
    meta: {} as { videoId: string }
  }

} as const satisfies Record<VideoErrorCode, ErrorDefinition>