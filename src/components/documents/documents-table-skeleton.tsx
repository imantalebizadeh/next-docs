import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export function DocumentsTableSkeleton() {
  return (
    <TableBody>
      {new Array(5).fill(0).map((_, i) => (
        <TableRow key={`row-${i + 1}`}>
          <TableCell>
            <div className="flex items-center gap-x-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="size-8 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
