"use client";

import type { ComponentProps } from "react";

import {
  ClientSideSuspense,
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { IconBell } from "@tabler/icons-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

function Notifications() {
  const isMobile = useIsMobile();
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
        <div
          className={cn(
            "w-lg rounded-md py-4 text-center text-muted-foreground text-sm",
            !!isMobile && "h-16 w-auto"
          )}
        >
          No notifications
        </div>
      )}
    </>
  );
}

function NotificationsButton() {
  const isMobile = useIsMobile();
  const { count } = useUnreadInboxNotificationsCount();

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <NotificationTrigger />
          </DrawerTrigger>
          <DrawerContent>
            <DialogHeader className="sr-only">
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>
                You have {count} unread notifications
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className={cn("h-96", count === 0 && "h-auto")}>
              <ClientSideSuspense fallback={<NotificationsSkeleton />}>
                <Notifications />
              </ClientSideSuspense>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <NotificationTrigger />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-full max-w-lg p-px">
            <ScrollArea className={cn("h-72", count === 0 && "h-auto")}>
              <ClientSideSuspense fallback={<NotificationsSkeleton />}>
                <Notifications />
              </ClientSideSuspense>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}

function NotificationTrigger({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const { count } = useUnreadInboxNotificationsCount();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={cn("relative rounded-full", className)}
      {...props}
    >
      <span className="sr-only">Notifications</span>
      <IconBell />
      {count > 0 && (
        <Badge className="-top-1 -right-1 absolute h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          {count}
        </Badge>
      )}
    </Button>
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
