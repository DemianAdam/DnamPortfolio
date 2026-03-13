/* =========================================================
   Error Codes
   ========================================================= */

export const ERROR_CODES = {
  UNAUTHENTICATED: "UNAUTHENTICATED",
  UNAUTHORIZED: "UNAUTHORIZED",

  VIDEO_NOT_FOUND: "VIDEO_NOT_FOUND",
  VIDEO_ACCESS_DENIED: "VIDEO_ACCESS_DENIED",

  ACCESS_CODE_INVALID: "ACCESS_CODE_INVALID",
  ACCESS_CODE_EXPIRED: "ACCESS_CODE_EXPIRED",
  ACCESS_CODE_MAXED: "ACCESS_CODE_MAXED",
} as const;

export type ErrorCode =
  typeof ERROR_CODES[keyof typeof ERROR_CODES];


/* =========================================================
   HTTP Status Mapping
   ========================================================= */

export const ERROR_STATUS = {
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,

  VIDEO_NOT_FOUND: 404,
  VIDEO_ACCESS_DENIED: 403,

  ACCESS_CODE_INVALID: 400,
  ACCESS_CODE_EXPIRED: 400,
  ACCESS_CODE_MAXED: 400,
} as const satisfies Record<ErrorCode, number>;


/* =========================================================
   Translations
   ========================================================= */

export type Language = "en" | "es";

type ErrorMessage = {
  title: string
  description: string
};

export const ERROR_MESSAGES: Record<
  Language,
  Record<ErrorCode, ErrorMessage>
> = {
  en: {
    UNAUTHENTICATED: {
      title: "Not authenticated",
      description: "You must log in to access this resource."
    },
    UNAUTHORIZED: {
      title: "Unauthorized",
      description: "You do not have permission to perform this action."
    },

    VIDEO_NOT_FOUND: {
      title: "Video not found",
      description: "The requested video does not exist."
    },
    VIDEO_ACCESS_DENIED: {
      title: "Access denied",
      description: "You do not have access to this video."
    },

    ACCESS_CODE_INVALID: {
      title: "Invalid code",
      description: "The access code is invalid."
    },
    ACCESS_CODE_EXPIRED: {
      title: "Code expired",
      description: "This access code has expired."
    },
    ACCESS_CODE_MAXED: {
      title: "Code limit reached",
      description: "This access code has reached its maximum number of uses."
    }
  },

  es: {
    UNAUTHENTICATED: {
      title: "No autenticado",
      description: "Debes iniciar sesión para acceder a este recurso."
    },
    UNAUTHORIZED: {
      title: "No autorizado",
      description: "No tienes permiso para realizar esta acción."
    },

    VIDEO_NOT_FOUND: {
      title: "Video no encontrado",
      description: "El video solicitado no existe."
    },
    VIDEO_ACCESS_DENIED: {
      title: "Acceso denegado",
      description: "No tienes acceso a este video."
    },

    ACCESS_CODE_INVALID: {
      title: "Código inválido",
      description: "El código de acceso no es válido."
    },
    ACCESS_CODE_EXPIRED: {
      title: "Código expirado",
      description: "Este código de acceso ha expirado."
    },
    ACCESS_CODE_MAXED: {
      title: "Límite alcanzado",
      description: "Este código de acceso alcanzó su número máximo de usos."
    }
  }
};


/* =========================================================
   Error Class
   ========================================================= */

export class AppError extends Error {
  code: ErrorCode
  status: number
  meta?: unknown

  constructor(code: ErrorCode, meta?: unknown) {
    super(code)

    this.code = code
    this.status = ERROR_STATUS[code]
    this.meta = meta
  }
}


/* =========================================================
   Helpers
   ========================================================= */

export function getErrorMessage(
  code: ErrorCode,
  lang: Language = "en"
): ErrorMessage {
  return ERROR_MESSAGES[lang][code];
}


export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}