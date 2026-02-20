import { accountTable } from "./account/schema";
import { authenticatorTable } from "./authenticator/schema";
import { sessionTable } from "./session/schema";
import { verificationTokenTable } from "./verificationToken/schema";

export const authTables = {
    sessions: sessionTable,
    accounts: accountTable,
    verificationTokens: verificationTokenTable,
    authenticators: authenticatorTable
}