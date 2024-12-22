import type { SchemaTypeDefinition } from "sanity";
import { postType } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType],
};