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
    messages: {
      en: {
        title: "Invalid access code",
        description: "The access code you entered is not valid"
      },
      es: {
        title: "Código inválido",
        description: "El código de acceso ingresado no es válido"
      }
    },
    meta: {} as { code: string }
  },

  [ACCESS_CODE_ERROR_CODE.EXPIRED]: {
    status: 400,
    messages: {
      en: {
        title: "Access code expired",
        description: "This access code is no longer valid"
      },
      es: {
        title: "Código expirado",
        description: "Este código de acceso ya no es válido"
      }
    },
    meta: {} as { code: string }
  },

  [ACCESS_CODE_ERROR_CODE.MAXED]: {
    status: 400,
    messages: {
      en: {
        title: "Access code limit reached",
        description: "This access code has already been used the maximum number of times"
      },
      es: {
        title: "Límite alcanzado",
        description: "Este código de acceso ya fue utilizado el número máximo de veces"
      }
    },
    meta: {} as { code: string }
  }

} as const satisfies Record<AccessCodeErrorCode, ErrorDefinition>