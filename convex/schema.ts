import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  departments: defineTable({
    code: v.string(),
    name: v.string(),
    stream: v.string(),
    faculty: v.string(),
    duration: v.string(),
    description: v.string(),
    requiredGPA: v.optional(v.number()),
    workplaces: v.optional(v.array(v.string())),
    recommendedUniversities: v.optional(
      v.array(
        v.object({
          name: v.string(),
          location: v.string(),
          code: v.string(),
        })
      )
    ),
  }),
});