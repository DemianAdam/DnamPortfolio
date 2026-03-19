import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"
import { Role } from "@/convex/user/types/role"

import { Session } from "next-auth"
import { NextRequest } from "next/server"
import { z } from "zod"


export type DesktopSession = {
  convexToken: string
  source: "desktop"
}

export type ApiSession = DesktopSession | Session
export type ApiOptions<TBody extends z.ZodTypeAny | undefined> = {
  auth?: false | undefined,
  body?: TBody
} | {
  auth: true,
  role?: Role
  body?: TBody
}

export type SessionFromOptions<TOptions> =
  TOptions extends { auth: true }
    ? ApiSession
    : null

export type ApiContext<
  TRoute extends AppRouteHandlerRoutes,
  TOptions extends ApiOptions<z.ZodTypeAny | undefined>
> = {
  request: NextRequest

  body: TOptions extends { body: z.ZodTypeAny }
    ? z.infer<TOptions["body"]>
    : undefined

  session: TOptions extends { auth: true }
    ? ApiSession
    : null

  params: Awaited<RouteContext<TRoute>["params"]>
}