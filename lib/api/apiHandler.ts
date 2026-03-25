import { auth } from "@/auth"
import { AppError, mapErrorToResponse } from "@/lib/errors/AppError"
import { ERROR_CODE } from "@/lib/errors/registry"
import { parseBody } from "./parseBody"
import { logApi } from "./logger"
import { ApiContext, ApiFailure, ApiHandlerReturn, ApiOptions, ApiResponse, ApiSession, ApiSuccess, SessionFromOptions } from "./types"
import { NextRequest, NextResponse } from "next/server"
import { AppRouteHandlerRoutes } from "@/.next/dev/types/routes"
import z from "zod"
import { createConvexClient } from "../convex/serverClient"
import { ErrorDefinition, ErrorCode } from "../errors/types"



export function apiHandler<
  TRoute extends AppRouteHandlerRoutes,
  TOptions extends ApiOptions<z.ZodType | undefined>,
  TResponse = TOptions extends { return: z.ZodType }
  ? z.output<TOptions["return"]>
  : undefined
>(
  options: TOptions,
  handler: (ctx: ApiContext<TRoute, TOptions>) => Promise<TResponse>
): ApiHandlerReturn<TRoute> {

  return async (request, context) => {
    const start = Date.now()

    try {
      logApi("api_request", {
        path: request.url,
        method: request.method
      })

      // =========================
      // AUTH
      // =========================

      let session: ApiSession | null = null

      if (options.auth) {
        const authHeader = request.headers.get("authorization")

        // Desktop
        if (authHeader?.startsWith("Bearer ")) {
          const token = authHeader.replace("Bearer ", "")

          session = {
            convexToken: token,
            source: "desktop"
          }
        }
        // Browser
        else {
          session = await auth()
        }

        if (!session) {
          throw new AppError(ERROR_CODE.AUTH.UNAUTHENTICATED)
        }
      }

      // =========================
      // BODY
      // =========================

      let body: unknown = undefined

      if (options.body) {
        body = await parseBody(request, options.body)
      }

      const params = await context.params

      const convex =
        session && "convexToken" in session
          ? createConvexClient({ token: session.convexToken })
          : undefined

      // =========================
      // EXECUTE HANDLER
      // =========================
      
      const result = await handler({
        request,
        body: body as ApiContext<TRoute, TOptions>["body"],
        session: session as SessionFromOptions<TOptions>,
        params,
        convex: convex as ApiContext<TRoute, TOptions>["convex"]
      })

      const duration = Date.now() - start

      logApi("api_success", {
        path: request.url,
        duration
      })

      const response: ApiSuccess<TResponse> = {
        success: true,
        data: result
      }

      return NextResponse.json(response)

    } catch (error) {

      const duration = Date.now() - start

      // =========================
      // KNOWN ERROR
      // =========================
      let response: ApiFailure;
      if (!(error instanceof AppError)) {
        response = mapErrorToResponse(new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR))
      }
      else {
        response = mapErrorToResponse(error)
      }

      logApi("api_error", {
        code: response.error.code,
        duration
      })

      return NextResponse.json(response, {
        status: response.error.status
      })
    }
  }
}

