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
    const orgId = (identity.org_id ?? undefined) as string | undefined;
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      content: args.content,
      ownerId: userId,
      organizationId: orgId,
      updatedAt: new Date().toISOString(),
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
      updatedAt: new Date().toISOString(),
    });
  },
});

// Delete a document mutation
export const remove = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    if (identity.subject !== document.ownerId) {
      throw new ConvexError("You are not authorized to delete this document");
    }

    if (
      document.organizationId &&
      identity.org_id !== document.organizationId
    ) {
      throw new ConvexError("You are not authorized to delete this document");
    }

    await ctx.db.delete(args.documentId);
  },
});

// List all documents for the current user
export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, search }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const orgId = identity.org_id as string | undefined;

    // If search is provided and orgId is provided, search for documents in the organization
    if (search && orgId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", orgId)
        )
        .paginate(paginationOpts);
    }

    // If search is provided, search for documents
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", identity.subject)
        )
        .paginate(paginationOpts);
    }

    // If orgId is provided, return all documents for the organization
    if (orgId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization", (q) => q.eq("organizationId", orgId))
        .order("desc")
        .paginate(paginationOpts);
    }

    // Otherwise, return all documents for the current user
    return await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .order("desc")
      .paginate(paginationOpts);
  },
});
