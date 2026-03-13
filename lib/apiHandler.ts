import { isAppError } from "@/lib/errors";

type ApiHandler = (req: Request) => Promise<Response>;

export function apiHandler(handler: ApiHandler): ApiHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (err) {

      if (isAppError(err)) {
        return Response.json(
          { error: err.code },
          { status: err.status }
        );
      }

      console.error("Unhandled error:", err);

      return Response.json(
        { error: "INTERNAL_ERROR" },
        { status: 500 }
      );
    }
  };
}