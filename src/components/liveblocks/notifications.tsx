"use client";

import {
  ClientSideSuspense,
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { IconBell } from "@tabler/icons-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

function Notifications() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      {inboxNotifications.length > 0 ? (
        <InboxNotificationList className="[&>li:first-child>a]:rounded-t-md [&>li:last-child>a]:rounded-b-md">
          {inboxNotifications.map((notification) => (
            <InboxNotification
              key={notification.id}
              inboxNotification={notification}
            />
          ))}
        </InboxNotificationList>
      ) : (
        <div className="w-lg rounded-md py-4 text-center text-muted-foreground text-sm">
          No notifications
        </div>
      )}
    </>
  );
}

function NotificationsButton() {
  const { count } = useUnreadInboxNotificationsCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="relative rounded-full"
        >
          <span className="sr-only">Notifications</span>
          <IconBell />
          {count > 0 && (
            <Badge className="-top-1 -right-1 absolute h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
              {count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full max-w-lg p-px">
        <ScrollArea className="h-72">
          <ClientSideSuspense fallback={<NotificationsSkeleton />}>
            <Notifications />
          </ClientSideSuspense>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

function NotificationsSkeleton() {
  return (
    <div className="w-lg divide-y">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`notification-skeleton-${index + 1}`}
          className="flex gap-3 p-3"
        >
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { NotificationsButton };
