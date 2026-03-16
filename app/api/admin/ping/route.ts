import { apiHandler } from "@/lib/api/apiHandler";
import { AppError } from "@/lib/errors/AppError";
import { ERROR_CODE } from "@/lib/errors/registry";
import { NextResponse } from "next/server";

export const GET = apiHandler({
    auth: true
},
    async ({ request }) => {
        return {
            status: "ok",
            message: "Admin connection successful"
        };
    });