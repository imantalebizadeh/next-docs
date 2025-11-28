"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function AvatarStack() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <>
      {users.length > 0 && (
        <div className="-space-x-2 flex items-center">
          {currentUser && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="size-7 ring-2 ring-background">
                  <AvatarImage
                    src={currentUser.info.avatar}
                    alt={currentUser.info.name}
                  />
                  <AvatarFallback>{currentUser.info.name.at(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>You</p>
              </TooltipContent>
            </Tooltip>
          )}

          {users.slice(0, 3).map(({ connectionId, info }) => (
            <Tooltip key={connectionId}>
              <TooltipTrigger asChild>
                <Avatar
                  key={connectionId}
                  className="size-7 ring-2 ring-background"
                >
                  <AvatarImage src={info.avatar} alt={info.name} />
                  <AvatarFallback>{info.name.at(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{info.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {hasMoreUsers && (
            <Avatar>
              <AvatarFallback>+{users.length - 3}</AvatarFallback>
            </Avatar>
          )}
        </div>
      )}
    </>
  );
}

function AvatarStackSkeleton() {
  return (
    <div className="-space-x-2 flex items-center">
      {new Array(3).fill(0).map((_, i) => (
        <Skeleton
          key={`avatar-${i + 1}`}
          className="size-7 rounded-full ring-2 ring-background"
        />
      ))}
    </div>
  );
}

export { AvatarStack, AvatarStackSkeleton };
