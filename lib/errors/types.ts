export type Language = "en" | "es"

export type ErrorMessage = {
  title: string
  description: string
}

export type ErrorDefinition = {
  status: number
  message?: Record<Language, ErrorMessage>
  meta?: unknown
}