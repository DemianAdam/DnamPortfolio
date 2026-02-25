/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Adapter,
  AdapterAccount,
  AdapterAuthenticator,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { FunctionArgs, FunctionReference } from "convex/server";
import { api } from "../convex/_generated/api";
import { Doc, Id } from "../convex/_generated/dataModel";

type User = AdapterUser & { id: Id<"users"> };
type Session = AdapterSession & { userId: Id<"users"> };
type Account = AdapterAccount & { userId: Id<"users"> };
type Authenticator = AdapterAuthenticator & { userId: Id<"users"> };

export const ConvexAdapter: Adapter = {
  async createAuthenticator(authenticator: Authenticator) {
    await callMutation(api.auth.authenticator.mutations.createAuthenticator, { authenticator });
    return authenticator;
  },
  async createSession(session: Session) {
    const id = await callMutation(api.auth.session.mutations.createSession, {
      session: toDB(session),
    });
    return { ...session, id };
  },
  async createUser({ id: _, ...user }: User) {
    const id = await callMutation(api.auth.user.mutations.createUser, {
      user: toDB(user),
    });
    return { ...user, id };
  },
  async createVerificationToken(verificationToken: VerificationToken) {
    await callMutation(api.auth.verificationToken.mutations.createVerificationToken, {
      verificationToken: toDB(verificationToken),
    });
    return verificationToken;
  },
  async deleteSession(sessionToken) {
    return maybeSessionFromDB(
      await callMutation(api.auth.session.mutations.deleteSession, {
        sessionToken,
      }),
    );
  },
  async deleteUser(id: Id<"users">) {
    return maybeUserFromDB(
      await callMutation(api.auth.user.mutations.deleteUser, { id }),
    );
  },
  async getAccount(providerAccountId, provider) {
    return await callQuery(api.auth.account.queries.getAccount, {
      provider,
      providerAccountId,
    });
  },
  async getAuthenticator(credentialID) {
    return await callQuery(api.auth.authenticator.queries.getAuthenticator, { credentialID });
  },
  async getSessionAndUser(sessionToken) {
    const result = await callQuery(api.auth.session.queries.getSessionAndUser, {
      sessionToken,
    });
    if (result === null) {
      return null;
    }
    const { user, session } = result;
    return { user: userFromDB(user), session: sessionFromDB(session) };
  },
  async getUser(id: Id<"users">) {
    return maybeUserFromDB(await callQuery(api.auth.user.queries.getUser, { id }));
  },
  async getUserByAccount({ provider, providerAccountId }) {
    return maybeUserFromDB(
      await callQuery(api.auth.user.queries.getUserByAccount, {
        provider,
        providerAccountId,
      }),
    );
  },
  async getUserByEmail(email) {
    return maybeUserFromDB(
      await callQuery(api.auth.user.queries.getUserByEmail, { email }),
    );
  },
  async linkAccount(account: Account) {
    return await callMutation(api.auth.account.mutations.linkAccount, { account });
  },
  async listAuthenticatorsByUserId(userId: Id<"users">) {
    return await callQuery(api.auth.authenticator.queries.listAuthenticatorsByUserId, {
      userId,
    });
  },
  async unlinkAccount({ provider, providerAccountId }) {
    return (
      (await callMutation(api.auth.account.mutations.unlinkAccount, {
        provider,
        providerAccountId,
      })) ?? undefined
    );
  },
  async updateAuthenticatorCounter(credentialID, newCounter) {
    return await callMutation(api.auth.authenticator.mutations.updateAuthenticatorCounter, {
      credentialID,
      newCounter,
    });
  },
  async updateSession(session: Session) {
    return await callMutation(api.auth.session.mutations.updateSession, {
      session: toDB(session),
    });
  },
  async updateUser(user: User) {
    await callMutation(api.auth.user.mutations.updateUser, { user: toDB(user) });
    return user;
  },
  async useVerificationToken({ identifier, token }) {
    return maybeVerificationTokenFromDB(
      await callMutation(api.auth.verificationToken.mutations.useVerificationToken, {
        identifier,
        token,
      }),
    );
  },
};

/// Helpers

function callQuery<Query extends FunctionReference<"query">>(
  query: Query,
  args: Omit<FunctionArgs<Query>, "secret">,
) {
  return fetchQuery(query, addSecret(args) as any);
}

function callMutation<Mutation extends FunctionReference<"mutation">>(
  mutation: Mutation,
  args: Omit<FunctionArgs<Mutation>, "secret">,
) {
  return fetchMutation(mutation, addSecret(args) as any);
}

function addSecret(args: Record<string, any>) {
  return { ...args, secret: getSecret() };
}

function maybeUserFromDB(user: Doc<"users"> | null) {
  if (user === null) {
    return null;
  }
  return userFromDB(user);
}

function userFromDB(user: Doc<"users">) {
  return {
    ...user,
    id: user._id,
    emailVerified: maybeDate(user.emailVerified),
  };
}

function maybeSessionFromDB(session: Doc<"sessions"> | null) {
  if (session === null) {
    return null;
  }
  return sessionFromDB(session);
}

function sessionFromDB(session: Doc<"sessions">) {
  return { ...session, id: session._id, expires: new Date(session.expires) };
}

function maybeVerificationTokenFromDB(
  verificationToken: Doc<"verificationTokens"> | null,
) {
  if (verificationToken === null) {
    return null;
  }
  return verificationTokenFromDB(verificationToken);
}

function verificationTokenFromDB(verificationToken: Doc<"verificationTokens">) {
  return { ...verificationToken, expires: new Date(verificationToken.expires) };
}

function maybeDate(value: number | undefined) {
  return value === undefined ? null : new Date(value);
}

function toDB<T extends object>(
  obj: T,
): {
    [K in keyof T]: T[K] extends Date
    ? number
    : null extends T[K]
    ? undefined
    : T[K];
  } {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] =
      value instanceof Date
        ? value.getTime()
        : value === null
          ? undefined
          : value;
  }
  return result;
}
function getSecret() {
  const secret = process.env.CONVEX_AUTH_ADAPTER_SECRET;

  if (!secret) {
    throw new Error("Missing CONVEX_AUTH_ADAPTER_SECRET environment variable");
  }

  return secret;
}
