import { ERROR_REGISTRY } from "./registry"
import { ErrorDefinition, ErrorCode, ErrorMeta, AppErrorArgs } from "./types"
import { ApiFailure } from "../api/types"


export class AppError<T extends ErrorCode> extends Error {
  code: T
  error: ErrorDefinition

  constructor(...args: AppErrorArgs<T>) {
    const [code, meta] = args as [T, ErrorMeta<T>?]

    const def = ERROR_REGISTRY[code]

    super(def.messages.en.description)

    this.code = code
    this.error = {
      status: def.status,
      messages: def.messages,
      ...(meta !== undefined ? { meta } : {}) // 🔥 key fix
    }
  }
}
// =========================
// ERROR MAPPER
// =========================

export function mapErrorToResponse(error: AppError<ErrorCode>): ApiFailure {
  return {
    success: false,
    error: {
      code: error.code,
      status: error.error.status,
      messages: error.error.messages,
      meta: error.error.meta
    }
  }
}