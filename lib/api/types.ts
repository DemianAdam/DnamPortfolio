import { Session } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ConvexClient } from "../convex/serverClient"
import { ErrorCode, ErrorDefinition } from "../errors/types"
import { Role } from "../../convex/user/types/role"

// =========================
// ROUTE PARAM INFERENCE
// =========================

export type AppRouteHandlerRoutes = string

type ExtractParams<Path extends string> =
  Path extends `${string}[${infer Param}]${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : object

export type RouteContext<TRoute extends string> = {
  params: ExtractParams<TRoute>
}

// =========================
// SESSION
// =========================

export type DesktopSession = {
  convexToken: string
  source: "desktop"
}

export type ApiSession = DesktopSession | Session

// =========================
// OPTIONS
// =========================

export type ApiOptions<TBody extends z.ZodType | undefined> =
  | {
      auth?: false | undefined
      body?: TBody
      return?: z.ZodType
    }
  | {
      auth: true
      role?: Role
      body?: TBody
      return?: z.ZodType
    }

export type SessionFromOptions<TOptions> =
  TOptions extends { auth: true }
    ? ApiSession
    : null

// =========================
// CONTEXT
// =========================

export type ApiContext<
  TRoute extends AppRouteHandlerRoutes,
  TOptions extends ApiOptions<z.ZodType | undefined>
> = {
  request: NextRequest

  body: TOptions extends { body: z.ZodType }
    ? z.infer<TOptions["body"]>
    : undefined

  session: TOptions extends { auth: true }
    ? ApiSession
    : null

  params: RouteContext<TRoute>["params"]

  convex: TOptions extends { auth: true }
    ? ConvexClient
    : never
}

// =========================
// RESPONSE TYPES
// =========================

export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiFailure = {
  success: false
  error: ErrorDefinition & {
    code: ErrorCode
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

// =========================
// HANDLER
// =========================

export type ApiHandlerReturn<TRoute extends AppRouteHandlerRoutes> =
  (
    request: NextRequest,
    context: RouteContext<TRoute>
  ) => Promise<NextResponse>