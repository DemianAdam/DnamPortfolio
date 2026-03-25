import { z } from "zod"
import { AppError } from "@/lib/errors/AppError"
import { ERROR_CODE } from "@/lib/errors/registry"
import { NextRequest } from "next/server"

export async function parseBody<T extends z.ZodType>(
  request: NextRequest,
  schema: T
): Promise<z.infer<T>> {

  const json = await request.json()

  const result = schema.safeParse(json)

  if (!result.success) {
    throw new AppError(
      ERROR_CODE.VALIDATION.INVALID_BODY,
      { issues: result.error.issues }
    )
  }

  return result.data
}