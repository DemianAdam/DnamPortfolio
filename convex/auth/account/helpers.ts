import { AdapterAccount } from "next-auth/adapters";
import { Doc } from "../../_generated/dataModel";

export function toAdapterAccount(account: Doc<"accounts">): AdapterAccount {
  return {
    userId: account.userId as string,
    type: account.type,
    provider: account.provider,
    providerAccountId: account.providerAccountId,
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expires_at: account.expires_at,
    token_type: account.token_type
      ? (account.token_type.toLowerCase() as Lowercase<string>)
      : undefined,
    scope: account.scope,
    id_token: account.id_token,
    session_state: account.session_state,
  };
}