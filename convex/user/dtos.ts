import z from "zod";
import { simpleUserValidator } from "./validators";

export type SimpleUserDTO = z.infer<typeof simpleUserValidator>