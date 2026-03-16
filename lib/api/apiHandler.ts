import { z } from "zod"
import { auth } from "@/auth"
import { AppError } from "@/lib/errors/AppError"
import { ERROR_CODE } from "@/lib/errors/registry"
import { parseBody } from "./parseBody"
import { logApi } from "./logger"
import { ApiContext, ApiOptions, ApiSession } from "./types"
import { NextRequest, NextResponse } from "next/server"
import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"
import { Session } from "next-auth"


export function apiHandler<
  TRoute extends AppRouteHandlerRoutes,
  TBodySchema extends z.ZodTypeAny | undefined = undefined,
  TResponse = unknown
>(
  options: ApiOptions<TBodySchema>,
  handler: (ctx: ApiContext<TRoute, TBodySchema>) => Promise<TResponse>
) {
  return async (
    request: NextRequest,
    context: RouteContext<TRoute>
  ): Promise<NextResponse> => {
    const start = Date.now()

    try {

      logApi("api_request", {
        path: request.url,
        method: request.method
      })

      // AUTH
      let session: ApiSession | null = null

      if (options.auth) {

        const authHeader = request.headers.get("authorization")

        // Desktop app authentication
        if (authHeader?.startsWith("Bearer ")) {

          const token = authHeader.replace("Bearer ", "")

          session = {
            convexToken: token,
            source: "desktop"
          }

        }
        // Browser authentication
        else {
          session = await auth()
        }

        if (!session) {
          throw new AppError(ERROR_CODE.AUTH.UNAUTHENTICATED)
        }
      }

      // BODY
      let body: any = undefined

      if (options.body) {
        body = await parseBody(request, options.body)
      }

      const params = await context.params

      const result = await handler({
        request,
        body,
        session,
        params
      })

      const duration = Date.now() - start

      logApi("api_success", {
        path: request.url,
        duration
      })

      if (result instanceof NextResponse) {
        return result
      }

      return NextResponse.json(result)

    } catch (error) {

      const duration = Date.now() - start

      if (error instanceof AppError) {

        logApi("api_error", {
          code: error.code,
          duration
        })

        return NextResponse.json(
          {
            code: error.code,
            meta: error.meta
          },
          { status: error.status }
        )
      }

      console.error("Unhandled API error:", error)

      return NextResponse.json(
        { code: "INTERNAL_SERVER_ERROR" },
        { status: 500 }
      )
    }
  }
}