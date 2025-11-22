import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

// Create a new document mutation
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

// Update a document mutation
export const update = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, {
      title: args.title,
      content: args.content,
    });
  },
});

// Delete a document mutation
export const remove = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.documentId);
  },
});

// List all documents for the current user
export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .order("desc")
      .paginate(args.paginationOpts);

    return documents;
  },
});
