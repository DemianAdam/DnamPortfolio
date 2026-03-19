import { apiHandler } from "@/lib/api/apiHandler";

export const GET = apiHandler({
    auth: true
},
    async ({ }) => {
        return {
            status: "ok",
            message: "Admin connection successful"
        };
    });