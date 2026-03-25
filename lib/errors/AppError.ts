
import { off } from "process"
import { nameof } from "../nameof"
import { ERROR_REGISTRY } from "./registry"
import { ErrorDefinition, Language, ErrorCode, ErrorMeta, AppErrorArgs } from "./types"
import { VIDEO_ERROR_CODE } from "./video"
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