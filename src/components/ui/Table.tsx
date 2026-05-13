import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shadcn_ui/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcn_ui/components/ui/table";
import { Button } from "./button";

export default function TableSection({
  headers,
  bodyData,
}: {
  headers: Array<{ id: string; name?: string }>;
  bodyData: Array<{
    id: string;
    name?: string;
    email?: string;
    description?: string;
    items?: string;
    status?: string;
  }>;
}) {

  return (
    <Table>
      <TableHeader className="bg-gray-200 rounded-xl!">
        <TableRow className="py-3!">
          {headers.map((header) => (
            <TableHead key={header.id}>{header.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {/* Example rows */}
        {bodyData.map((item) => (
          <TableRow key={item.id}>
            {item.name && (
              <TableCell className="font-medium">{item.name}</TableCell>
            )}
            {item.description && (
              <TableCell className="font-medium">{item.description}</TableCell>
            )}
            {item.email && (
              <TableCell className="font-medium">{item.email}</TableCell>
            )}
            {item.items && (
              <TableCell className="font-medium">{item.items}</TableCell>
            )}

            {item.status && (
              <TableCell>
                <span className="px-3! py-2! bg-green-500/30 text-green-900 font-bold rounded-full">
                  {item?.status}
                </span>
              </TableCell>
            )}

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
