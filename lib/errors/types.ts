import { ERROR_REGISTRY } from "./registry"

export const LANGUAGES = {
  EN: "en",
  ES: "es"
} as const


export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]

export type ErrorMessage = {
  title: string
  description: string
}

export type ErrorDefinition<TMeta = unknown> = {
  status: number
  messages: Record<Language, ErrorMessage>
  meta?: TMeta
}

export type ErrorMap<TCodes extends string> = {
  [K in TCodes]: ErrorDefinition<any>
}

type IsNeverOrUndefined<T> =
  [T] extends [undefined] ? true : false

export type ErrorCode = keyof typeof ERROR_REGISTRY

export type ExtractMeta<T> =
  T extends { meta: infer M }
  ? M
  : undefined

export type ErrorMeta<T extends ErrorCode> =
  ExtractMeta<(typeof ERROR_REGISTRY)[T]>

export type AppErrorArgs<T extends ErrorCode> =
  IsNeverOrUndefined<ErrorMeta<T>> extends true
  ? [code: T] // no meta allowed
  : [code: T, meta: ErrorMeta<T>] // meta required