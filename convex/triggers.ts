import { Change, Triggers } from "convex-helpers/server/triggers";
import { DataModel, TableNames } from "./_generated/dataModel";
import { GenericDataModel } from "convex/server";
const triggers = new Triggers<DataModel>();
type TriggerFunction = Parameters<typeof triggers.register>[1]
type TriggerCtx = Parameters<TriggerFunction>[0]
export const triggersDB = triggers.wrapDB;
type ChangeByOperation<
    Op extends Change<GenericDataModel, TableNames>["operation"]
> = Extract<Change<GenericDataModel, TableNames>, { operation: Op }>;

export type InsertOperation = (ctx: TriggerCtx, args: ChangeByOperation<"insert">) => Promise<void>
export type DeleteOperation = (ctx: TriggerCtx, args: ChangeByOperation<"delete">) => Promise<void>
export type UpdateOperation = (ctx: TriggerCtx, args: ChangeByOperation<"update">) => Promise<void>

export function subscribeTrigger(
    tableName: TableNames,
    events: Partial<{
        insert: InsertOperation;
        update: UpdateOperation;
        delete: DeleteOperation;
    }>
) {
    triggers.register(tableName, async (ctx, change) => {
        switch (change.operation) {
            case "insert":
                await events.insert?.(ctx, change);
                break;
            case "update":
                await events.update?.(ctx, change);
                break;
            case "delete":
                await events.delete?.(ctx, change);
                break;
        }
    });
}


