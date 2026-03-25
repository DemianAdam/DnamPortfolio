import { ErrorDefinition } from "./types"

export const AUTH_ERROR_CODE = {
  UNAUTHENTICATED: "AUTH_UNAUTHENTICATED",
  UNAUTHORIZED: "AUTH_UNAUTHORIZED"
} as const

export type AuthErrorCode =
  typeof AUTH_ERROR_CODE[keyof typeof AUTH_ERROR_CODE]

export const AUTH_ERRORS = {

  [AUTH_ERROR_CODE.UNAUTHENTICATED]: {
    status: 401,
    messages: {
      en: {
        title: "Authentication required",
        description: "You must be authenticated to perform this action"
      },
      es: {
        title: "Autenticación requerida",
        description: "Debes iniciar sesión para realizar esta acción"
      }
    }
  },

  [AUTH_ERROR_CODE.UNAUTHORIZED]: {
    status: 403,
    messages: {
      en: {
        title: "Access denied",
        description: "You do not have permission to perform this action"
      },
      es: {
        title: "Acceso denegado",
        description: "No tienes permiso para realizar esta acción"
      }
    }
  }

} as const satisfies Record<AuthErrorCode, ErrorDefinition>