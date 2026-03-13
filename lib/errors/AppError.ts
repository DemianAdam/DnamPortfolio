import { ERROR_REGISTRY, ErrorCode, ErrorMeta } from "./registry"

export class AppError<T extends ErrorCode> extends Error {

  code: T
  status: number
  meta?: ErrorMeta<T>

  constructor(code: T, meta?: ErrorMeta<T>) {
    super(code)

    const def = ERROR_REGISTRY[code]

    this.code = code
    this.status = def.status
    this.meta = meta
  }
}