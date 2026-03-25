import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"
import { Role } from "@/convex/user/types/role"

import { Session } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ConvexClient } from "../convex/serverClient"
import { ErrorCode, ErrorDefinition } from "../errors/types"
import { AppError } from "../errors/AppError"


export type DesktopSession = {
  convexToken: string
  source: "desktop"
}

export type ApiSession = DesktopSession | Session
export type ApiOptions<TBody extends z.ZodType | undefined> = {
  auth?: false | undefined,
  body?: TBody,
  return?: z.ZodType
} | {
  auth: true,
  role?: Role,
  body?: TBody,
  return?: z.ZodType
}

export type SessionFromOptions<TOptions> =
  TOptions extends { auth: true }
    ? ApiSession
    : null

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

  params: Awaited<RouteContext<TRoute>["params"]>
  convex: TOptions["auth"] extends true ? ConvexClient : never;
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
  (request: NextRequest, context: RouteContext<TRoute>) => Promise<NextResponse>