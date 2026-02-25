import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation, zCustomAction } from "convex-helpers/server/zod4";
import { action, mutation, query } from "../_generated/server";
import { customCtx } from "convex-helpers/server/customFunctions";
import { triggersDB } from "../triggers";

export const zQuery = zCustomQuery(query, NoOp)
export const zMutation = zCustomMutation(mutation, customCtx(triggersDB));
export const zAction = zCustomAction(action, NoOp);

