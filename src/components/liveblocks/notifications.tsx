"use client";

import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { IconBell } from "@tabler/icons-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

function Notifications() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <InboxNotificationList className="[&>li:first-child>a]:rounded-t-md [&>li:last-child>a]:rounded-b-md">
      {inboxNotifications.length > 0 ? (
        inboxNotifications.map((inboxNotification) => (
          <InboxNotification
            key={inboxNotification.id}
            inboxNotification={inboxNotification}
          />
        ))
      ) : (
        <div className="rounded-md bg-muted p-4 text-center text-muted-foreground text-sm">
          No notifications
        </div>
      )}
    </InboxNotificationList>
  );
}

function NotificationsButton() {
  const { count } = useUnreadInboxNotificationsCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
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
        <ScrollArea className="max-h-72">
          <Notifications />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export { NotificationsButton };
