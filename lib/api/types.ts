import { NextRequest } from "next/server"
import { z } from "zod"

export type ApiOptions<TBody extends z.ZodTypeAny | undefined> = {
  auth?: boolean
  body?: TBody
}

export type ApiContext<TBody> = {
  request: NextRequest
  body: TBody
  session: any | null
  params: any
}