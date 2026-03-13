import { AppError } from "./errors/AppError";


type ApiHandler = (req: Request) => Promise<Response>;

export function apiHandler(handler: ApiHandler): ApiHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (err) {

      if (err instanceof AppError) {
        return Response.json(
          {
            code: err.code,
            meta: err.meta
          },
          { status: err.status }
        )
      }

      console.error("Unhandled error:", err)

      return Response.json(
        {
          code: "INTERNAL_SERVER_ERROR"
        },
        { status: 500 }
      )
    }
  };
}