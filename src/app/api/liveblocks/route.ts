import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../../../convex/_generated/api";
import { env } from "@/env";

const httpClient = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);
const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(request: Request) {
  const { orgId } = await auth();
  const user = await currentUser();

  if (!user) {
    console.log("Unauthorized no user");
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await request.json();

  const document = await httpClient.query(api.documents.getById, {
    documentId: room,
  });

  if (!document) {
    return new Response("Document not found", { status: 404 });
  }

  const isOwner = user.id === document.ownerId;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === orgId
  );

  if (!(isOwner || isOrganizationMember)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const name = user.fullName ?? "Anonymous";
  const nameToNumber = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = `hsl(${Math.abs(nameToNumber) % 360}, 100%, 50%)`;

  const liveblockSession = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });

  liveblockSession.allow(room, liveblockSession.FULL_ACCESS);

  const { body, status } = await liveblockSession.authorize();

  return new Response(body, { status });
}
