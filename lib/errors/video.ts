import { ErrorMap } from "./types"

export const VIDEO_ERROR_CODE = {
  NOT_FOUND: "VIDEO_NOT_FOUND",
  ACCESS_DENIED: "VIDEO_ACCESS_DENIED",
  ALREADY_DELETED: "VIDEO_ALREADY_DELETED"
} as const

export type VideoErrorCode =
  typeof VIDEO_ERROR_CODE[keyof typeof VIDEO_ERROR_CODE]

export const VIDEO_ERRORS = {

  [VIDEO_ERROR_CODE.NOT_FOUND]: {
    status: 404,
    messages: {
      en: {
        title: "Video not found",
        description: "The requested video does not exist"
      },
      es: {
        title: "Video no encontrado",
        description: "El video solicitado no existe"
      }
    },
    meta: {} as { videoId: string }
  },

  [VIDEO_ERROR_CODE.ACCESS_DENIED]: {
    status: 403,
    messages: {
      en: {
        title: "Access denied",
        description: "You do not have access to this video"
      },
      es: {
        title: "Acceso denegado",
        description: "No tienes acceso a este video"
      }
    },
    meta: {} as { videoId: string }
  },
  [VIDEO_ERROR_CODE.ALREADY_DELETED]: {
    status: 400,
    messages: {
      en: {
        title: "Video already deleted",
        description: "This video has already been deleted"
      },
      es: {
        title: "Video ya eliminado",
        description: "Este video ya ha sido eliminado"
      }
    },
    meta: {} as { videoId: string }
  }
} as const satisfies ErrorMap<VideoErrorCode>