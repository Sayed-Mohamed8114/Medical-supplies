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

export default function TableSection() {
  return (
    <Table>
      <TableHeader className="bg-gray-200 rounded-xl!">
        <TableRow className="py-3!">
          <TableHead>Name</TableHead>
          <TableHead>Info</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {/* Example rows */}
        <TableRow>
          <TableCell className="font-medium">BioMed Solutions Inc.</TableCell>
          <TableCell>orders@biomed.com</TableCell>
          <TableCell>48 items</TableCell>
          <TableCell>
            <span className="px-3! py-2! bg-green-500/30 text-green-900 font-bold rounded-full">
              Active
            </span>
          </TableCell>
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
        <TableRow>
          <TableCell className="font-medium">BioMed Solutions Inc.</TableCell>
          <TableCell>orders@biomed.com</TableCell>
          <TableCell>48 items</TableCell>
          <TableCell>
            <span className="px-3! py-2! bg-red-500/30 text-red-900 font-bold rounded-full">
              Inactive
            </span>
          </TableCell>
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
        <TableRow>
          <TableCell className="font-medium">BioMed Solutions Inc.</TableCell>
          <TableCell>orders@biomed.com</TableCell>
          <TableCell>48 items</TableCell>
          <TableCell>
            <span className="px-3! py-2! bg-green-500/30 text-green-900 font-bold rounded-full">
              Active
            </span>
          </TableCell>
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
      </TableBody>
    </Table>
  );
}
