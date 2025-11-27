import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const { orgId } = await auth();
  const clerk = await clerkClient();

  const { data: users } = await clerk.users.getUserList({
    organizationId: orgId ? [orgId] : undefined,
  });

  return users.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: user.fullName ?? "Anonymous",
    avatar: user.imageUrl,
  }));
}
