import { Doc } from "../../_generated/dataModel";

export type User = Doc<"users">
export type CompletedUser = Extract<User, { completed: true }>
export type IncompleteUser = Extract<User, { completed: false }>