import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDepartments = query({
  args: {
    stream: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const allDepartments = await ctx.db.query("departments").collect();

    if (!args.stream || args.stream === "All") {
      return allDepartments;
    }

    const targetStream = args.stream.toLowerCase().trim();
    return allDepartments.filter((dept) => {
      if (!dept.stream) return false;
      const deptStream = dept.stream.toLowerCase().trim();
      return deptStream.includes(targetStream) || targetStream.includes(deptStream);
    });
  },
});