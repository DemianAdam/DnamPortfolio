import { auth } from "@/auth"
import { AppError } from "@/lib/errors/AppError"
import { ERROR_CODE } from "@/lib/errors/registry"
import { parseBody } from "./parseBody"
import { logApi } from "./logger"
import { ApiContext, ApiOptions, ApiSession, SessionFromOptions } from "./types"
import { NextRequest, NextResponse } from "next/server"
import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"
import z from "zod"

export function apiHandler<
  TRoute extends AppRouteHandlerRoutes,
  TOptions extends ApiOptions<z.ZodTypeAny | undefined> = ApiOptions<z.ZodTypeAny | undefined>,
  TResponse = unknown
>(
  options: TOptions,
  handler: (ctx: ApiContext<TRoute, TOptions>) => Promise<TResponse>
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


      let body: unknown

      if (options.body) {
        body = await parseBody(request, options.body)
      } else {
        body = undefined
      }

      const params = await context.params

      const result = await handler({
        request,
        body: body as ApiContext<TRoute, TOptions>["body"],
        session: session as SessionFromOptions<TOptions>,
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