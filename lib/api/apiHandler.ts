import { z } from "zod"
import { auth } from "@/auth"
import { AppError } from "@/lib/errors/AppError"
import { ERROR_CODE } from "@/lib/errors/registry"
import { parseBody } from "./parseBody"
import { logApi } from "./logger"
import { ApiOptions } from "./types"
import { NextRequest, NextResponse } from "next/server"
import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"

export function apiHandler<
  TRoute extends AppRouteHandlerRoutes,
  TBodySchema extends z.ZodTypeAny | undefined = undefined,
  TResponse = unknown
>(
  options: ApiOptions<TBodySchema>,
  handler: (ctx: {
    request: NextRequest
    body: TBodySchema extends z.ZodTypeAny ? z.infer<TBodySchema> : undefined
    session: any | null
    params: Awaited<RouteContext<TRoute>["params"]>
  }) => Promise<TResponse>
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
      let session = null

      if (options.auth) {
        session = await auth()

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