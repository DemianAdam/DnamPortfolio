import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"
import { Role } from "@/convex/user/types/role"

import { Session } from "next-auth"
import { NextRequest } from "next/server"
import { z } from "zod"


type DesktopSession = {
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

export type ApiContext<TRoute extends AppRouteHandlerRoutes, TBody extends z.ZodTypeAny | undefined = undefined> = {
  request: NextRequest
  body: TBody extends z.ZodTypeAny ? z.infer<TBody> : undefined
  session: ApiSession | null
  params: Awaited<RouteContext<TRoute>["params"]>
}