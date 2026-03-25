import { ACCESS_CODE_ERROR_CODE, ACCESS_CODE_ERRORS } from "./accessCode";
import { AUTH_ERROR_CODE, AUTH_ERRORS } from "./auth";
import { ErrorDefinition } from "./types";
import { USER_ERROR_CODE, USER_ERRORS } from "./user";
import { VALIDATION_ERROR_CODE, VALIDATION_ERRORS } from "./validation";
import { VIDEO_ERROR_CODE, VIDEO_ERRORS } from "./video";


export const ERROR_CODE = {
  AUTH: AUTH_ERROR_CODE,
  VIDEO: VIDEO_ERROR_CODE,
  ACCESS_CODE: ACCESS_CODE_ERROR_CODE,
  USER: USER_ERROR_CODE,
  VALIDATION: VALIDATION_ERROR_CODE,
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
} as const

export const ERROR_REGISTRY = {
  ...AUTH_ERRORS,
  ...VIDEO_ERRORS,
  ...ACCESS_CODE_ERRORS,
  ...USER_ERRORS,
  ...VALIDATION_ERRORS,
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    status: 500,
    messages: {
      en: {
        title: "Internal server error",
        description: "There was an error internal to the server"
      },
      es: {
        title: "Error interno del servidor",
        description: "Hubo un error interno del servidor"
      }
    }
  } satisfies ErrorDefinition
} as const

