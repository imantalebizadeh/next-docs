import { ConvexError, v } from "convex/values";

import { mutation } from "./_generated/server";

// Create a new document
export const create = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const userId = identity.subject;
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      content: args.content,
      ownerId: userId,
    });

    return documentId;
  },
});
